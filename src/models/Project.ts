namespace ProjectModel {
  interface KanbanInfo {
    row?: string[];
    col?: string[];
  }

  export interface CreateInfo extends KanbanInfo {
    creator: string;
    name: string;
    iteration?: number;
    teamId?: number;
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
  }
}

export default ProjectModel;
