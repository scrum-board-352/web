import { GraphQLClient } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
import { getStore } from "rlax";
import { graphqlUrl } from "./url";

class Client extends GraphQLClient {
  request<T extends any>(query: string, variables?: Variables): Promise<T> {
    const user = getStore("user");

    if (user) {
      const token = user.token;

      if (token) {
        this.setHeader("authorization", `Bearer ${token}`);
      }
    }

    return super.request(query, variables);
  }
}

export default new Client(graphqlUrl);
