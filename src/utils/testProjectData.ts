import ProjectModel from "models/Project";
import testUserData from "./testUserData";

const shitMountain: ProjectModel.Info = {
  id: 5683,
  name: "Shit Mountain",
  createTime: "2020-03-01",
  iteration: 14,
  creator: testUserData.publicInfo.mokuo,
};

const shitMountainv2: ProjectModel.Info = {
  id: 846383,
  name: "Shit Mountain v2",
  createTime: "2020-03-01",
  iteration: 7,
  creator: testUserData.publicInfo.emmm,
};

export default {
  info: {
    shitMountain,
    shitMountainv2,
  },
};
