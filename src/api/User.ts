import UserMutation from "api/mutation/UserMutation";
import UserQuery from "api/query/UserQuery";
import ResultOutput from "models/ResultOutput";
import UserModel from "models/User";
import { setApiMappingName } from "./base/api-name-mapping";
import client from "./base/client";

setApiMappingName(login, "login");
export async function login(loginInfo: UserModel.LoginInfo): Promise<UserModel.PrivateInfo> {
  const data = await client.request(UserQuery.loginQuery, loginInfo);
  return data.login;
}

setApiMappingName(logout, "logout");
export async function logout(username: { username: string }): Promise<ResultOutput> {
  const data = await client.request(UserQuery.logoutQuery, username);
  return data.logout;
}

setApiMappingName(register, "register");
export async function register(registerInfo: UserModel.RegisterInfo): Promise<ResultOutput> {
  const data = await client.request(UserMutation.registerMutation, registerInfo);
  return data.register;
}

setApiMappingName(updateUser, "updateUser");
export async function updateUser(updateInfo: UserModel.UpdateInfo): Promise<UserModel.PrivateInfo> {
  const data = await client.request(UserMutation.updateMutation, updateInfo);
  return data.updateUser;
}

setApiMappingName(selectUserBySubstring, "selectUserBySubstring");
export async function selectUserBySubstring(usernameSubstring: {
  usernameSubstring: string;
}): Promise<Array<UserModel.PrivateInfo>> {
  const data = await client.request(UserQuery.selectUser, usernameSubstring);
  return data.selectUserBySubstring;
}

setApiMappingName(selectPeopleByTeamId, "selectPeopleByTeamId");
export async function selectPeopleByTeamId(teamId: {
  teamId: string;
}): Promise<Array<UserModel.PrivateInfo>> {
  const data = await client.request(UserQuery.selectPeopleByTeamId, teamId);
  return data.selectPeopleByTeamId;
}
