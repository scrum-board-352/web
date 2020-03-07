import UserModel from "./User";

namespace MessageModel {
  export interface Info {
    id: string;
    announcer: UserModel.PublicInfo;
    description: string;
    updateTime: string;
    isRead: boolean;
  }
}

export default MessageModel;
