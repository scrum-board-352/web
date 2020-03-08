import UserQuery from "graphql/query/UserQuery";
import ResultOutput from "models/ResultOutput";
import UserModel from "models/User";
import client from "./client";

export async function login(
  loginInfo: UserModel.LoginInfo
): Promise<UserModel.PrivateInfo> {
  const data = await client.request(UserQuery.loginQuery, loginInfo);
  return data.login;
}

export async function logout(username: {
  username: String;
}): Promise<ResultOutput.Info> {
  const data = await client.request(UserQuery.logoutQuery, username);
  return data.logout;
}

export async function register(
  registerInfo: UserModel.RegisterInfo
): Promise<ResultOutput.Info> {
  const data = await client.request(UserQuery.registerQuery, registerInfo);
  return data.register;
}
