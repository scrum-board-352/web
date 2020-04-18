namespace CardModel {
  export interface CreateInfo {
    title: string;
    status: string;
    founder: string;
    boardId: string;
    description?: string;
    storyPoints?: number;
    priority?: "high" | "medium" | "low" | "lowest";
    processor?: string;
  }

  export interface UpdateInfo {
    id: string;
    title?: string;
    status?: string;
    description?: string;
    storyPoints?: number;
    priority?: "high" | "medium" | "low" | "lowest";
    processor?: string;
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
    number: number;
  }
}

export default CardModel;
