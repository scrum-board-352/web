import ProjectMutation from "graphql/mutation/ProjectMutation";
import ProjectQuery from "graphql/query/ProjectQuery";
import ProjectModel from "models/Project";
import ResultOutput from "models/ResultOutput";
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

export async function createProject(
  projeceCreateModel: ProjectModel.CreateInfo
): Promise<ResultOutput> {
  const data = await client.request(
    ProjectMutation.createProject,
    projeceCreateModel
  );
  return data.createProject;
}

export async function updateProject(
  projeceUpdateModel: ProjectModel.UpdateInfo
): Promise<ResultOutput> {
  const data = await client.request(
    ProjectMutation.updateProject,
    projeceUpdateModel
  );
  return data.updateProject;
}

export async function removeProject(projectId: {
  projectId: string;
}): Promise<ResultOutput> {
  const data = await client.request(ProjectMutation.removeProject, projectId);
  return data.removeProject;
}
