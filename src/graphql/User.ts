import UserModel from "models/User";
import client from "./client";

const loginQuery = `
  query login($username: String!, $password: String!) {
    login(SelectionInput: {
      userInput: {
        username: $username
        password: $password
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

export async function login(
  loginInfo: UserModel.LoginInfo
): Promise<UserModel.PrivateInfo> {
  return client.request(loginQuery, loginInfo);
}
