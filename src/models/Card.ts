namespace CardModel {
  export interface CreateInfo {
    title: string;
    description: string;
    storyPoints: number;
    priority: "high" | "medium" | "low" | "lowest";
    status: string;
    processor?: string;
  }

  export interface Info extends CreateInfo {
    id: string;
    createTime: string;
    founder: string;
  }
}

export default CardModel;
