namespace TeamModel {
  export interface CreateInfo {
    name: string;
    creator: string;
    description: string;
  }

  export interface Info extends CreateInfo {
    id: string;
  }
}

export default TeamModel;
