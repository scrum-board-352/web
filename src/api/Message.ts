import CommentMutation from "api/mutation/CommentMutation";
import MessageQuery from "api/query/MessageQuery";
import Message from "models/Message";
import ResultOutput from "models/ResultOutput";
import client from "./base/client";

export async function getCommentByReceiver(receiver: {
  receiver: string;
}): Promise<Array<Message.InfoOutput>> {
  const data: any = await client.request(MessageQuery.getCommentByReceiverQuery, receiver);
  return data.getCommitByReceiver;
}

export async function createComment(createInfo: Message.CreateInfo): Promise<Message.Info> {
  const data: any = await client.request(CommentMutation.createComment, createInfo);
  return data.createCommit;
}

export async function updateComment(updateInfo: Message.UpdateInfo): Promise<Message.Info> {
  const data: any = await client.request(CommentMutation.updateComment, updateInfo);
  return data.updateCommit;
}

export async function removeComment(commentId: { commentId: string }): Promise<ResultOutput> {
  const data: any = await client.request(CommentMutation.removeComment, {
    commitId: commentId.commentId,
  });
  return data.removeCommit;
}

export async function selectCommentsByCardId(cardId: {
  cardId: string;
}): Promise<Array<Message.Info>> {
  const data: any = await client.request(MessageQuery.getCommentByCardId, cardId);
  return data.selectCommentsByCardId;
}
