import BoardMutation from "api/mutation/BoardMutation";
import BoardQuery from "api/query/BoardQuery";
import { default as Board, default as BoardModel } from "models/Board";
import ResultOutput from "models/ResultOutput";
import { setApiMappingName } from "./base/api-name-mapping";
import client from "./base/client";

setApiMappingName(createBoard, "createBoard");
export async function createBoard(createInfo: Board.CreateInfo): Promise<BoardModel.Info> {
  const data = await client.request(BoardMutation.createBoard, createInfo);
  return data.createBoard;
}

setApiMappingName(removeBoard, "removeBoard");
export async function removeBoard(boardId: { boardId: string }): Promise<ResultOutput> {
  const data = await client.request(BoardMutation.removeBoard, boardId);
  return data.removeBoard;
}

setApiMappingName(selectBoardsByProjectId, "selectBoardsByProjectId");
export async function selectBoardsByProjectId(projectId: {
  projectId: string;
}): Promise<Array<BoardModel.Info>> {
  const data = await client.request(BoardQuery.selectBoardsByProjectIdQuery, projectId);
  return data.selectBoardsByProjectId;
}
