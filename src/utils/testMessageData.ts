import MessageModel from "models/Message";
import testUserData from "./testUserData";

const msg1: MessageModel.Info = {
  id: "875254",
  announcer: testUserData.publicInfo.mokuo,
  description: "还在睡！起来修Bug！Pipeline都红成猴屁股了！",
  updateTime: "2020-03-01 12:04",
  isRead: false,
};

const msg2: MessageModel.Info = {
  id: "5484709",
  announcer: testUserData.publicInfo.emmm,
  description: "更改名称：shit -> big shit",
  updateTime: "2020-03-01 02:06",
  isRead: true,
};

const commentMsg = [
  "LGTM!",
  "我觉得还行。",
  "简直是乱搞！",
  "不得行不得行！",
  "要得要得。",
  "这个地方可以这样，再那样，最后这样，就可以了。",
  "巴适巴适。",
  "嗯？",
];

function randomComment() {
  const len = commentMsg.length;
  return commentMsg[Math.round(Math.random() * len)];
}

const comments: MessageModel.Info[] = new Array(10).fill(null).map((_, i) => ({
  id: i.toString(),
  announcer: testUserData.publicInfo.mokuo,
  description: randomComment(),
  updateTime: "2020-03-01 12:04",
  isRead: false,
}));

export default {
  info: {
    msg1,
    msg2,
    comments,
  },
};
