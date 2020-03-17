import { getCommitByReceiver } from "graphql/Message";
import { createTeam, sendEmailToInviteReceiverJoinTeam } from "graphql/Team";
import { login, logout, register, update } from "graphql/User";
import EmailModel from "models/Email";
import Message from "models/Message";
import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
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
    const result: ResultOutput = await logout(username);
    expect(result.success).toEqual(true);
  });

  test("should get user register", async () => {
    const registerInfo: UserModel.RegisterInfo = {
      username: process.env.REACT_APP_REGISTER_USERNAME ?? "",
      password: process.env.REACT_APP_REGISTER_PASSWORD ?? "",
      email: process.env.REACT_APP_REGISTER_EMAIL ?? "",
    };
    const result: ResultOutput = await register(registerInfo);
    expect(result.success).toEqual(false);
  });

  test("should get user update", async () => {
    const updateInfo: UserModel.UpdateInfo = {
      username: process.env.REACT_APP_UPDATE_USERNAME ?? "",
      password: process.env.REACT_APP_UPDATE_PASSWORD ?? "",
    };
    const result: ResultOutput = await update(updateInfo);
    expect(result.success).toEqual(true);
  });
});

describe("message api tests", () => {
  test("should get message by receiver", async () => {
    const receiver = {
      receiver: process.env.REACT_APP_RECEIVER_USERNAME ?? "",
    };
    const result: [Message.Info] = await getCommitByReceiver(receiver);
    expect(result.length).toEqual(2);
  });
});

describe("team api tests", () => {
  test("should get team create", async () => {
    const teamInfo: TeamModel.CreateInfo = {
      creator: process.env.REACT_APP_TEAM_CREATOR ?? "",
      name: process.env.REACT_APP_TEAM_NAME ?? "",
      description: process.env.REACT_APP_TEAM_DESCRIPTION ?? "",
    };
    const result: ResultOutput = await createTeam(teamInfo);
    expect(result.message).toEqual("one creator can not create same name team");
  });

  test("should get email send", async () => {
    const teamInfo: EmailModel.TeamInfo = {
      receiverMail: process.env.REACT_APP_EMAIL_RECEIVERMAIL ?? "",
      announcer: process.env.REACT_APP_EMAIL_ANNOUNCER ?? "",
      teamId: process.env.REACT_APP_EAMIL_TEAMID ?? "",
    };
    const result: ResultOutput = await sendEmailToInviteReceiverJoinTeam(
      teamInfo
    );
    expect(result.success).toEqual(true);
  });
});
