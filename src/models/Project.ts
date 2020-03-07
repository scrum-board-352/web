import UserModel from "./User";

namespace ProjectModel {
  export interface Info {
    id: string;
    name: string;
    createTime: string;
    iteration: number;
    creator: UserModel.PublicInfo;
  }
}

export default ProjectModel;
