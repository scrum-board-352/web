import { selectBoardsByProjectId } from "graphql/Board";
import { selectCardsByBoardId, updateCard } from "graphql/Card";
import { getCommitByReceiver, updateCommit } from "graphql/Message";
import { selectProjectByCreator, updateProject } from "graphql/Project";
import {
  createTeam,
  selectTeamByUser,
  sendEmailToInviteReceiverJoinTeam,
  updateTeam,
} from "graphql/Team";
import {
  login,
  logout,
  register,
  selectUserBySubstring,
  update,
} from "graphql/User";
import BoardModel from "models/Board";
import CardModel from "models/Card";
import EmailModel from "models/Email";
import Message from "models/Message";
import ProjectModel from "models/Project";
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
    const result: UserModel.PrivateInfo = await update(updateInfo);
    expect(result.name).toEqual(process.env.REACT_APP_UPDATE_USERNAME);
  });

  test("should get user select by substring", async () => {
    const usernameSubstring = {
      usernameSubstring: process.env.REACT_APP_SELECT_SUBSTRING ?? "",
    };
    const result: Array<UserModel.PrivateInfo> = await selectUserBySubstring(
      usernameSubstring
    );
    expect(result.length).toEqual(2);
  });
});

describe("message api tests", () => {
  test("should get message by receiver", async () => {
    const receiver = {
      receiver: process.env.REACT_APP_RECEIVER_USERNAME ?? "",
    };
    const result: Array<Message.Info> = await getCommitByReceiver(receiver);
    expect(result.length).toEqual(2);
  });

  // test("should get commit create", async () => {
  //   const commitCreateInfo: Commit.CreateInfo = {
  //     description: process.env.REACT_APP_COMMIT_DESCRIPTION ?? "",
  //     announcer: process.env.REACT_APP_COMMIT_ANNOUNCER ?? "",
  //     receiver: process.env.REACT_APP_COMMIT_RECEIVER ?? "",
  //     cardId: process.env.REACT_APP_COMMIT_CARDID ?? "",
  //   };
  //   const result: Commit.Info = await createCommit(commitCreateInfo);
  //   expect(result.description).toEqual(
  //     process.env.REACT_APP_COMMIT_DESCRIPTION
  //   );
  // });
  test("should get commit update", async () => {
    const commitUpdateInfo: Message.UpdateInfo = {
      id: process.env.REACT_APP_COMMIT_ID ?? "",
      read: (process.env.REACT_APP_COMMIT_READ ?? "") === "true",
      description: process.env.REACT_APP_COMMIT_DESCRIPTION_UPDATE ?? "",
    };
    const result: Message.Info = await updateCommit(commitUpdateInfo);
    expect(result.description).toEqual(
      process.env.REACT_APP_COMMIT_DESCRIPTION_UPDATE
    );
  });

  // test("should get commit remove", async () => {
  //   const commitId = {
  //     commitId: process.env.REACT_APP_COMMIT_ID ?? "",
  //   };
  //   const result: ResultOutput = await removeCommit(commitId);
  //   expect(result.success).toEqual(true);
  // });
});

describe("team api tests", () => {
  test("should get team create", async () => {
    const teamInfo: TeamModel.CreateInfo = {
      creator: process.env.REACT_APP_TEAM_CREATOR ?? "",
      name: process.env.REACT_APP_TEAM_NAME ?? "",
      description: process.env.REACT_APP_TEAM_DESCRIPTION ?? "",
    };
    const result: TeamModel.Info = await createTeam(teamInfo);
    expect(result.description).toEqual(
      "one creator can not create same name team"
    );
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

  test("should get team update", async () => {
    const teamInfo: TeamModel.Info = {
      id: process.env.REACT_APP_TEAM_ID ?? "",
      creator: process.env.REACT_APP_TEAM_CREATOR ?? "",
      name: process.env.REACT_APP_TEAM_NAME ?? "",
      description: process.env.REACT_APP_TEAM_DESCRIPTION ?? "",
    };
    const result: TeamModel.Info = await updateTeam(teamInfo);
    expect(result.description).toEqual(process.env.REACT_APP_TEAM_DESCRIPTION);
  });

  test("should get teamList by user", async () => {
    const username = {
      username: process.env.REACT_APP_TEAM_CREATOR ?? "",
    };
    const result: Array<TeamModel.Info> = await selectTeamByUser(username);
    expect(result.length).toEqual(1);
  });
});

describe("project api tests", () => {
  test("should get project by creator", async () => {
    const creator = {
      creator: process.env.REACT_APP_PROJECT_CREATOR ?? "",
    };
    const result: Array<ProjectModel.Info> = await selectProjectByCreator(
      creator
    );
    expect(result.length).toEqual(1);
  });

  // run this test will create new project by jianglianEin, it will let previous test error.
  // test("should get project create", async () => {
  //   const projectCreateModel: ProjectModel.CreateInfo = {
  //     creator: process.env.REACT_APP_PROJECT_CREATOR ?? "",
  //     name: process.env.REACT_APP_PROJECT_NAME ?? "",
  //   };
  //   const result: ProjectModel.Info = await createProject(projectCreateModel);
  //   expect(result.creator).toEqual( process.env.REACT_APP_PROJECT_CREATOR);
  // });

  test("should get project update", async () => {
    const projectCreateModel: ProjectModel.UpdateInfo = {
      id: process.env.REACT_APP_PROJECT_ID ?? "",
      name: process.env.REACT_APP_PROJECT_NAME ?? "",
    };
    const result: ProjectModel.Info = await updateProject(projectCreateModel);
    expect(result.name).toEqual(process.env.REACT_APP_PROJECT_NAME);
  });

  // test("should get project remove", async () => {
  //   const projectId = {
  //     projectId: process.env.REACT_APP_PROJECT_ID ?? "",
  //   };
  //   const result: ResultOutput = await removeProject(projectId);
  //   expect(result.success).toEqual(true);
  // });
});

describe("board api tests", () => {
  // test("should get board create", async () => {
  //   const boardCreateInfo: BoardModel.CreateInfo = {
  //     projectId: process.env.REACT_APP_BOARD_PROJECTID ?? "",
  //   };
  //   const result: BoardModel.Info = await createBoard(boardCreateInfo);
  //   expect(result.id).not.toBeNull();
  // });

  test("should get board select by projectId", async () => {
    const projectId = {
      projectId: process.env.REACT_APP_BOARD_PROJECTID ?? "",
    };
    const result: Array<BoardModel.Info> = await selectBoardsByProjectId(
      projectId
    );
    expect(result.length).toEqual(2);
  });

  // test("should get board remove", async () => {
  //   const boardId = {
  //     boardId: process.env.REACT_APP_BOARD_ID ?? "",
  //   };
  //   const result: ResultOutput = await removeBoard(boardId);
  //   expect(result.success).toEqual(true);
  // });
});

describe("card api tests", () => {
  // test("should get card create", async () => {
  //   const cardCreateInfo: CardModel.CreateInfo = {
  //     title: process.env.REACT_APP_CARD_TITLE ?? "",
  //     status: process.env.REACT_APP_CARD_STATUS ?? "",
  //     founder: process.env.REACT_APP_CARD_FOUNDER ?? "",
  //     boardId: process.env.REACT_APP_CARD_BOARDID ?? "",
  //   };
  //   const result: CardModel.Info = await createCard(cardCreateInfo);
  //   expect(result.title).toEqual(process.env.REACT_APP_CARD_TITLE);
  // });
  test("should get card update", async () => {
    const cardUpdateInfo: CardModel.UpdateInfo = {
      id: process.env.REACT_APP_CARD_ID ?? "",
      title: process.env.REACT_APP_CARD_TITLE_UPDATE ?? "",
    };
    const result: CardModel.Info = await updateCard(cardUpdateInfo);
    expect(result.title).toEqual(process.env.REACT_APP_CARD_TITLE_UPDATE);
  });

  test("should get card select by board", async () => {
    const boardId = {
      boardId: process.env.REACT_APP_CARD_BOARDID ?? "",
    };
    const result: Array<CardModel.Info> = await selectCardsByBoardId(boardId);
    expect(result.length).toEqual(1);
  });

  // test("should get card remove", async () => {
  //   const cardId = {
  //     cardId: process.env.REACT_APP_CARD_ID ?? "",
  //   };
  //   const result: ResultOutput = await removeCard(cardId);
  //   expect(result.success).toEqual(true);
  // });
});
