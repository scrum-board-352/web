import ProjectQuery from "graphql/query/ProjectQuery";
import ProjectModel from "models/Project";
import client from "./client";

export async function selectProjectByCreator(creator: {
  creator: string;
}): Promise<[ProjectModel.Info]> {
  const data = await client.request(
    ProjectQuery.selectProjectByCreatorQuery,
    creator
  );
  return data.selectProjectByCreator;
}
