import ResultOutput from "models/ResultOutput";
import UserModel from "models/User";
import client from "./client";

const loginQuery = `
  query login($username: String!, $password: String!) {
    login(selectionInput: {
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

const logoutQuery = `
  query logout($username: String!) {
  	logout(username: $username) {
      success: susses
  	  message
  	}
  }
`;

export async function login(
  loginInfo: UserModel.LoginInfo
): Promise<UserModel.PrivateInfo> {
  const data = await client.request(loginQuery, loginInfo);
  return data.login;
}

export async function logout(username: {
  username: String;
}): Promise<ResultOutput.Info> {
  const data = await client.request(logoutQuery, username);
  return data.logout;
}
