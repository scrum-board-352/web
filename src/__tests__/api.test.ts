import { login } from "graphql/User";
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
});
