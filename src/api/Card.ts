import CardMutation from "api/mutation/CardMutation";
import CardQuery from "api/query/CardQuery";
import { default as Card } from "models/Card";
import ResultOutput from "models/ResultOutput";
import client from "./base/client";

export async function createCard(createInfo: Card.CreateInfo): Promise<Card.Info> {
  const data = await client.request(CardMutation.createCard, createInfo);
  return data.createCard;
}

export async function updateCard(updateInfo: Card.UpdateInfo): Promise<Card.Info> {
  const data = await client.request(CardMutation.updateCard, updateInfo);
  return data.updateCard;
}

export async function selectCardsByBoardId(boardId: {
  boardId: string;
}): Promise<Array<Card.Info>> {
  const data = await client.request(CardQuery.selectCardsByBoardId, boardId);
  return data.selectCardsByBoardId;
}

export async function removeCard(cardId: { cardId: string }): Promise<ResultOutput> {
  const data = await client.request(CardMutation.removeCard, cardId);
  return data.removeCard;
}
