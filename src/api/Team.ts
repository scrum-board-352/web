import EmailModel from "models/Email";
import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
import { setApiMappingName } from "./base/api-name-mapping";
import client from "./base/client";
import TeamMutation from "./mutation/TeamMutation";
import TeamQuery from "./query/TeamQuery";

setApiMappingName(createTeam, "createTeam");
export async function createTeam(teamInfo: TeamModel.CreateInfo): Promise<TeamModel.Info> {
  const data = await client.request(TeamMutation.createTeamMutation, teamInfo);
  return data.createTeam;
}

setApiMappingName(sendEmailToInviteReceiverJoinTeam, "sendEmailToInviteReceiverJoinTeam");
export async function sendEmailToInviteReceiverJoinTeam(
  teamInfo: EmailModel.TeamInfo
): Promise<ResultOutput> {
  const data = await client.request(TeamQuery.sendEmailQuery, teamInfo);
  return data.sendEmailToInviteReceiverJoinTeam;
}

setApiMappingName(updateTeam, "updateTeam");
export async function updateTeam(teamInfo: TeamModel.Info): Promise<TeamModel.Info> {
  const date = await client.request(TeamMutation.updateTeam, teamInfo);
  return date.updateTeam;
}

setApiMappingName(removeTeam, "removeTeam");
export async function removeTeam(teamId: { teamId: string }): Promise<ResultOutput> {
  const date = await client.request(TeamMutation.removeTeam, teamId);
  return date.updateTeam;
}

setApiMappingName(selectTeamByUsername, "selectTeamByUsername");
export async function selectTeamByUsername(username: {
  username: string;
}): Promise<Array<TeamModel.Info>> {
  const date = await client.request(TeamQuery.selectTeamByUser, username);
  return date.selectTeamByUsername;
}
