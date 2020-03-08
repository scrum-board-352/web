import { login, logout, register } from "graphql/User";
import ResultOutput from "models/ResultOutput";
import UserModel from "models/User";

describe("user api tests", () => {
  test("should get user login", async () => {
    const loginInfo: UserModel.LoginInfo = {
      username: process.env.REACT_APP_LOGIN_USERNAME ?? "",
      password: process.env.REACT_APP_LOGIN_PASSWORD ?? "",
    };
    const user: UserModel.PrivateInfo = await login(loginInfo);
    expect(user.id).not.toBeNull();
  });

  test("should get user logout", async () => {
    const username = { username: process.env.REACT_APP_LOGIN_USERNAME ?? "" };
    const result: ResultOutput.Info = await logout(username);
    expect(result.success).toEqual(true);
  });

  test("should get user register", async () => {
    const registerInfo: UserModel.RegisterInfo = {
      username: process.env.REACT_APP_REJISTER_USERNAME ?? "",
      password: process.env.REACT_APP_REJISTER_PASSWORD ?? "",
      email: process.env.REACT_APP_REJISTER_EMAIL ?? "",
    };
    const result: ResultOutput.Info = await register(registerInfo);
    expect(result.success).toEqual(false);
  });
});
