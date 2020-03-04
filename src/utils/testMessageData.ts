import MessageModel from "models/Message";
import testUserData from "./testUserData";

const msg1: MessageModel.Info = {
  id: 875254,
  announcer: testUserData.publicInfo.mokuo,
  description: "还在睡！起来修Bug！Pipeline都红成猴屁股了！",
  updateTime: "2020-03-01 12:04",
  isRead: false,
};

const msg2: MessageModel.Info = {
  id: 5484709,
  announcer: testUserData.publicInfo.emmm,
  description: "更改名称：shit -> big shit",
  updateTime: "2020-03-01 02:06",
  isRead: true,
};

export default {
  info: {
    msg1,
    msg2,
  },
};
