import { GraphQLClient } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
import { getUid } from "./auth";

const endpoint = process.env.REACT_APP_API_URL;

if (endpoint === undefined) {
  throw new Error("REACT_APP_API_URL is not set");
}

class Client extends GraphQLClient {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async request(query: string, variables: Variables) {
    const uid = getUid();
    if (uid) {
      variables["uid"] = uid;
    }
    return super.request(query, variables);
  }
}

export default new Client(endpoint);
