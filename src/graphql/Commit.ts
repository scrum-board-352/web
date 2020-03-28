import CommitMutation from "graphql/mutation/CommitMutation";
import { default as Commit } from "models/Message";
import client from "./client";

export async function createCommit(
  createInfo: Commit.CreateInfo
): Promise<Commit.Info> {
  const data = await client.request(CommitMutation.createCommit, createInfo);
  return data.createCommit;
}

export async function updateCommit(
  updateInfo: Commit.UpdateInfo
): Promise<Commit.Info> {
  const data = await client.request(CommitMutation.updateCommit, updateInfo);
  return data.updateCommit;
}
