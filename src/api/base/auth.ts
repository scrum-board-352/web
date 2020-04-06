import { post } from "./fetch";

type ApiCallFunc = (...args: any[]) => any;

interface AuthParams {
  projectId?: string;
  teamId?: string;
}

const apiUrl = process.env.REACT_APP_REST_API_URL;
if (!apiUrl) {
  throw new Error("'REACT_APP_REST_API_URL' not set!");
}

const authUrl = apiUrl + "/checkAuth";

let uid: string = "";

export function getUid() {
  if (!uid) {
    const localUid = window.localStorage.getItem("uid");
    if (localUid) {
      uid = localUid;
    }
  }
  return uid;
}

export default async function auth<T extends ApiCallFunc>(
  authParams: AuthParams | null,
  apiCall: T,
  ...apiParams: Parameters<T>
) {
  // register oparetion through RESTful api.
  const res = await post(authUrl, {
    ...authParams,
    functionName: apiCall.name,
  });
  if (!res.success) {
    throw new Error(res.message);
  }
  // set global uid.
  if (res.uid) {
    uid = res.uid;
    window.localStorage.setItem("uid", uid);
  }
  // call graphql api.
  return await apiCall(...apiParams);
}
