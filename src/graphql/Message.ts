import CommentMutation from "graphql/mutation/CommentMutation";
import MessageQuery from "graphql/query/MessageQuery";
import Message from "models/Message";
import ResultOutput from "models/ResultOutput";
import client from "./client";

export async function getCommentByReceiver(receiver: { receiver: string }): Promise<Array<Message.Info>> {
  const data = await client.request(MessageQuery.getCommentByReceiverQuery, receiver);
  return data.getCommitByReceiver;
}

export async function createComment(createInfo: Message.CreateInfo): Promise<Message.Info> {
  const data = await client.request(CommentMutation.createComment, createInfo);
  return data.createCommit;
}

export async function updateComment(updateInfo: Message.UpdateInfo): Promise<Message.Info> {
  const data = await client.request(CommentMutation.updateComment, updateInfo);
  return data.updateCommit;
}

export async function removeComment(commitId: { commitId: string }): Promise<ResultOutput> {
  const data = await client.request(CommentMutation.removeComment, commitId);
  return data.removeCommit;
}
