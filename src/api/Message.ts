import CommentMutation from "api/mutation/CommentMutation";
import MessageQuery from "api/query/MessageQuery";
import Message from "models/Message";
import ResultOutput from "models/ResultOutput";
import { setApiMappingName } from "./base/api-name-mapping";
import client from "./base/client";

setApiMappingName(getCommentByReceiver, "getCommitByReceiver");
export async function getCommentByReceiver(receiver: {
  receiver: string;
}): Promise<Array<Message.InfoOutput>> {
  const data = await client.request(MessageQuery.getCommentByReceiverQuery, receiver);
  return data.getCommitByReceiver;
}

setApiMappingName(createComment, "createCommit");
export async function createComment(createInfo: Message.CreateInfo): Promise<Message.Info> {
  const data = await client.request(CommentMutation.createComment, createInfo);
  return data.createCommit;
}

setApiMappingName(updateComment, "updateCommit");
export async function updateComment(updateInfo: Message.UpdateInfo): Promise<Message.Info> {
  const data = await client.request(CommentMutation.updateComment, updateInfo);
  return data.updateCommit;
}

setApiMappingName(removeComment, "removeCommit");
export async function removeComment(commitId: { commitId: string }): Promise<ResultOutput> {
  const data = await client.request(CommentMutation.removeComment, commitId);
  return data.removeCommit;
}

setApiMappingName(selectCommentsByCardId, "selectCommentsByCardId");
export async function selectCommentsByCardId(cardId: {
  cardId: string;
}): Promise<Array<Message.Info>> {
  const data = await client.request(MessageQuery.getCommentByCardId, cardId);
  return data.selectCommentsByCardId;
}
