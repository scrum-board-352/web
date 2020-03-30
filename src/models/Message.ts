import UserModel from "./User";

namespace MessageModel {
  export interface Info {
    id: string;
    announcer: UserModel.PublicInfo;
    description: string;
    updateTime: string;
    isRead: boolean;
    cardId: string;
  }

  export interface PosInfo {
    cardId: string;
    boardId: string;
    projectId: string;
  }

  export interface InfoOutput {
    info: Info;
    posInfo: PosInfo;
  }

  export interface CreateInfo {
    description: string;
    announcer: string;
    receiver: string;
    cardId: string;
  }

  export interface UpdateInfo {
    description?: string;
    read?: boolean;
    id: string;
  }
}

export default MessageModel;
