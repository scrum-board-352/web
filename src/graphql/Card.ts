import CardMutation from "graphql/mutation/CardMutation";
import { default as Card } from "models/Card";
import ResultOutput from "models/ResultOutput";
import client from "./client";

export async function createCard(
  createInfo: Card.CreateInfo
): Promise<ResultOutput> {
  const data = await client.request(CardMutation.createCard, createInfo);
  return data.createCard;
}

export async function updateCard(
  updateInfo: Card.UpdateInfo
): Promise<ResultOutput> {
  const data = await client.request(CardMutation.updateCard, updateInfo);
  return data.updateCard;
}
