namespace ProjectModel {
  export interface CreateInfo {
    creator: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row?: string[];
    col?: string[];
  }

  export interface UpdateInfo {
    id: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row?: string[];
    col?: string[];
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
    row: string[];
    col: string[];
  }
}

export default ProjectModel;
