namespace BoardModel {
  export interface CreateInfo {
    projectId: string;
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
  }
}

export default BoardModel;
