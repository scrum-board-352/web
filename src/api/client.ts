import { GraphQLClient } from "graphql-request";

const endpoint = process.env.REACT_APP_API_URL;

if (endpoint === undefined) {
  throw new Error("REACT_APP_API_URL is not set");
}

export default new GraphQLClient(endpoint);
