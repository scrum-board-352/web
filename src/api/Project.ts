import ProjectMutation from "api/mutation/ProjectMutation";
import ProjectQuery from "api/query/ProjectQuery";
import ProjectModel from "models/Project";
import ResultOutput from "models/ResultOutput";
import { setApiMappingName } from "./base/api-name-mapping";
import client from "./base/client";

setApiMappingName(selectProjectByCreator, "selectProjectByCreator");
export async function selectProjectByCreator(creator: {
  creator: string;
}): Promise<Array<ProjectModel.Info>> {
  const data = await client.request(ProjectQuery.selectProjectByCreatorQuery, creator);
  return data.selectProjectByCreator;
}

setApiMappingName(selectProjectById, "selectProjectById");
export async function selectProjectById(projectId: {
  projectId: string;
}): Promise<ProjectModel.Info> {
  const data = await client.request(ProjectQuery.selectProjectById, projectId);
  return data.selectProjectById;
}

setApiMappingName(createProject, "createProject");
export async function createProject(
  projeceCreateModel: ProjectModel.CreateInfo
): Promise<ProjectModel.Info> {
  const data = await client.request(ProjectMutation.createProject, projeceCreateModel);
  return data.createProject;
}

setApiMappingName(updateProject, "updateProject");
export async function updateProject(
  projeceUpdateModel: ProjectModel.UpdateInfo
): Promise<ProjectModel.Info> {
  const data = await client.request(ProjectMutation.updateProject, projeceUpdateModel);
  return data.updateProject;
}

setApiMappingName(removeProject, "removeProject");
export async function removeProject(projectId: { projectId: string }): Promise<ResultOutput> {
  const data = await client.request(ProjectMutation.removeProject, projectId);
  return data.removeProject;
}
