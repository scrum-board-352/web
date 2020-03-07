import UserModel from "./User";

namespace TeamModel {
  export interface Info {
    id: string;
    name: string;
    creator: UserModel.PublicInfo;
    description: string;
  }
}

export default TeamModel;
