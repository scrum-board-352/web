import BoardMutation from "graphql/mutation/BoardMutation";
import Board from "models/Board";
import ResultOutput from "models/ResultOutput";
import client from "./client";

export async function createBoard(
  createInfo: Board.CreateInfo
): Promise<ResultOutput> {
  const data = await client.request(BoardMutation.createBoard, createInfo);
  return data.createBoard;
}
