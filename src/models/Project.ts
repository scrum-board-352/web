namespace ProjectModel {
  export interface CreateInfo {
    creator: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row?: string;
    col?: string;
  }

  export interface UpdateInfo {
    id: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row?: string;
    col?: string;
  }

  export interface Info {
    id: string;
    createTime: string;
    creator: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row: string[];
    col: string[];
  }
}

export default ProjectModel;
