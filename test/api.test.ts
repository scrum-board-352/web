import { login } from "../src/graphql/User";
import UserModel from "../src/models/User";

describe("user api tests", () => {
  test("should get user login", async () => {
    const loginInfo: UserModel.LoginInfo = {
      username: "",
      password: "",
    };
    try {
      const user: UserModel.PrivateInfo = await login(loginInfo);
      expect(user.id).not.toBeNull();
    } catch (err) {
      expect(err).toBeNull();
    }
  });
});
