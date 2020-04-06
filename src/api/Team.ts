import EmailModel from "models/Email";
import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
import client from "./base/client";
import TeamMutation from "./mutation/TeamMutation";
import TeamQuery from "./query/TeamQuery";

export async function createTeam(teamInfo: TeamModel.CreateInfo): Promise<TeamModel.Info> {
  const data = await client.request(TeamMutation.createTeamMutation, teamInfo);
  return data.createTeam;
}

export async function sendEmailToInviteReceiverJoinTeam(
  teamInfo: EmailModel.TeamInfo
): Promise<ResultOutput> {
  const data = await client.request(TeamQuery.sendEmailQuery, teamInfo);
  return data.sendEmailToInviteReceiverJoinTeam;
}

export async function updateTeam(teamInfo: TeamModel.Info): Promise<TeamModel.Info> {
  const date = await client.request(TeamMutation.updateTeam, teamInfo);
  return date.updateTeam;
}

export async function selectTeamByUser(username: {
  username: string;
}): Promise<Array<TeamModel.Info>> {
  const date = await client.request(TeamQuery.selectTeamByUser, username);
  return date.selectTeamByUsername;
}
