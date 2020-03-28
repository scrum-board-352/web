import UserModel from "./User";

namespace MessageModel {
  export interface Info {
    id: string;
    announcer: UserModel.PublicInfo;
    description: string;
    updateTime: string;
    isRead: boolean;
  }

  export interface CreateInfo {
    description: string;
    announcer: string;
    receiver: string;
    cardId: string;
  }
}

export default MessageModel;
