namespace ProjectModel {
  export interface CreateInfo {
    creator: string;
    name: string;
    iteration?: number;
    teamId?: number;
    row?: string[];
    col?: string[];
  }

  export interface UpdateInfo extends KanbanInfo {
    id: string;
    name: string;
    iteration?: number;
    teamId?: number;
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
    row: string[];
    col: string[];
  }
}

export default ProjectModel;
