import TeamModel from "models/Team";
import testUserData from "./testUserData";

const lgtm: TeamModel.Info = {
  id: "12412",
  name: "LGTM",
  description: "This is what LGTM!",
  creator: testUserData.publicInfo.mokuo,
};

const shit: TeamModel.Info = {
  id: "1241241",
  name: "Shit",
  description: "Shit is always shit.",
  creator: testUserData.publicInfo.emmm,
};

export default {
  info: {
    lgtm,
    shit,
  },
};
