import CardMutation from "api/mutation/CardMutation";
import CardQuery from "api/query/CardQuery";
import CardModel from "models/Card";
import ResultOutput from "models/ResultOutput";
import client from "./base/client";

export async function createCard(createInfo: CardModel.CreateInfo): Promise<CardModel.Info> {
  const data: any = await client.request(CardMutation.createCard, createInfo);
  return data.createCard;
}

export async function updateCard(updateInfo: CardModel.UpdateInfo): Promise<CardModel.Info> {
  const data: any = await client.request(CardMutation.updateCard, updateInfo);
  return data.updateCard;
}

export async function selectCardsByBoardId(boardId: {
  boardId: string;
}): Promise<Array<CardModel.Info>> {
  const data: any = await client.request(CardQuery.selectCardsByBoardId, boardId);
  return data.selectCardsByBoardId;
}

export async function removeCard(cardId: { cardId: string }): Promise<ResultOutput> {
  const data: any = await client.request(CardMutation.removeCard, cardId);
  return data.removeCard;
}
