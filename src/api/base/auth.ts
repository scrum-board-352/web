import history from "utils/history";
import { PromiseType } from "utils/type";
import { getApiMappingName } from "./api-name-mapping";
import { post } from "./fetch";

type ApiCallFunc = (...args: any[]) => any;

interface AuthParams {
  username?: string;
  projectId?: string;
  teamId?: string;
}

const authUrl = "checkAuth";

let uidCache: string = "";

function setUid(uid: string) {
  uidCache = uid;
  window.localStorage.setItem("uid", uid);
}

export function getUid() {
  if (!uidCache) {
    const uid = window.localStorage.getItem("uid");
    if (uid) {
      uidCache = uid;
    }
  }
  return uidCache;
}

export default async function auth<T extends ApiCallFunc>(
  authParams: AuthParams | null,
  apiCall: T,
  ...apiParams: Parameters<T>
): Promise<PromiseType<ReturnType<T>>> {
  // register oparetion through RESTful api.
  const res = await post(authUrl, {
    ...authParams,
    functionName: getApiMappingName(apiCall),
  });
  if (!res.success) {
    if (res.message === "401") {
      history.replace("/401");
    } else if (res.message === "403") {
      history.replace("/403");
    } else {
      throw new Error(res.message);
    }
    throw new Error("Auth failed!");
  }
  // set global uid.
  if (res.uid) {
    setUid(res.uid);
  }
  // call graphql api.
  return await apiCall(...apiParams);
}
