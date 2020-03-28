import CommitMutation from "graphql/mutation/CommitMutation";
import { default as Commit } from "models/Message";
import client from "./client";

export async function createCommit(
  createInfo: Commit.CreateInfo
): Promise<Commit.Info> {
  const data = await client.request(CommitMutation.createCommit, createInfo);
  return data.createCommit;
}
