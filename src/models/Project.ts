namespace ProjectModel {
  interface KanbanInfo {
    row: string[];
    col: string[];
  }

  export interface CreateInfo extends KanbanInfo {
    name: string;
    iteration: number;
    teamId: number;
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
    creator: string;
  }
}

export default ProjectModel;
