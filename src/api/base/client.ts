import { GraphQLClient } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
import { getUid } from "./auth";
import { graphqlUrl } from "./url";

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

export default new Client(graphqlUrl);
