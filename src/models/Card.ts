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
    boardId?: string;
    description?: string;
    storyPoints?: number;
    priority?: "high" | "medium" | "low" | "lowest";
    processor?: string;
  }

  export interface Info {
    id: string;
    createTime: string;
    number: number;
    title: string;
    status: string;
    founder: string;
    description?: string;
    storyPoints?: number;
    priority?: "high" | "medium" | "low" | "lowest";
    processor?: string;
  }
}

export default CardModel;
