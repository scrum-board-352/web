import UserMutation from "api/mutation/UserMutation";
import UserQuery from "api/query/UserQuery";
import ResultOutput from "models/ResultOutput";
import UserModel from "models/User";
import client from "./client";

export async function login(loginInfo: UserModel.LoginInfo): Promise<UserModel.PrivateInfo> {
  const data = await client.request(UserQuery.loginQuery, loginInfo);
  return data.login;
}

export async function logout(username: { username: string }): Promise<ResultOutput> {
  const data = await client.request(UserQuery.logoutQuery, username);
  return data.logout;
}

export async function register(registerInfo: UserModel.RegisterInfo): Promise<ResultOutput> {
  const data = await client.request(UserMutation.registerMutation, registerInfo);
  return data.register;
}

export async function update(updateInfo: UserModel.UpdateInfo): Promise<UserModel.PrivateInfo> {
  const data = await client.request(UserMutation.updateMutation, updateInfo);
  return data.updateUser;
}

export async function selectUserBySubstring(usernameSubstring: {
  usernameSubstring: string;
}): Promise<Array<UserModel.PrivateInfo>> {
  const data = await client.request(UserQuery.selectUser, usernameSubstring);
  return data.selectUserBySubstring;
}

export async function selectPeopleByTeamId(teamId: {
  teamId: string;
}): Promise<Array<UserModel.PrivateInfo>> {
  const data = await client.request(UserQuery.selectPeopleByTeamId, teamId);
  return data.selectPeopleByTeamId;
}
