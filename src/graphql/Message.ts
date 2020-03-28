import CommitMutation from "graphql/mutation/CommitMutation";
import MessageQuery from "graphql/query/MessageQuery";
import Message from "models/Message";
import ResultOutput from "models/ResultOutput";
import client from "./client";

export async function getCommitByReceiver(receiver: {
  receiver: string;
}): Promise<Array<Message.Info>> {
  const data = await client.request(
    MessageQuery.getCommitByReceiverQuery,
    receiver
  );
  return data.getCommitByReceiver;
}

export async function createCommit(
  createInfo: Message.CreateInfo
): Promise<Message.Info> {
  const data = await client.request(CommitMutation.createCommit, createInfo);
  return data.createCommit;
}

export async function updateCommit(
  updateInfo: Message.UpdateInfo
): Promise<Message.Info> {
  const data = await client.request(CommitMutation.updateCommit, updateInfo);
  return data.updateCommit;
}

export async function removeCommit(commitId: {
  commitId: string;
}): Promise<ResultOutput> {
  const data = await client.request(CommitMutation.removeCommit, commitId);
  return data.removeCommit;
}
