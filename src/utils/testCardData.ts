import CardModel from "models/Card";
import testProjectData from "./testProjectData";
import testUserData from "./testUserData";

const content =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";

const card1: CardModel.Info = {
  id: "0",
  title: "Fix bug",
  description: content,
  createTime: "2020-03-17",
  founder: testUserData.publicInfo.mokuo.name,
  status: testProjectData.info.shitMountain.col[0],
  storyPoints: 1,
  priority: "high",
};

const card2: CardModel.Info = {
  id: "1545345",
  title: "Add new feature",
  description: content,
  createTime: "2020-03-17",
  founder: testUserData.publicInfo.mokuo.name,
  status: testProjectData.info.shitMountain.col[1],
  storyPoints: 3,
  priority: "low",
};

const cards = new Array(10)
  .fill(null)
  .map((_, i) => {
    return { ...card1, id: String(i) };
  })
  .concat(card2);

export default {
  info: {
    card1,
    card2,
    cards,
  },
};
