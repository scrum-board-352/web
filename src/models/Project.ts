import UserModel from "./User";

namespace ProjectModel {
  export interface Info {
    id: number;
    name: string;
    createTime: string;
    iteration: number;
    creator: UserModel.PublicInfo;
  }
}

export default ProjectModel;
