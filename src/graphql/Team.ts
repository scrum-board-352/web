import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
import client from "./client";
import TeamMutation from "./mutation/TeamMutation";

export async function createTeam(
  teamInfo: TeamModel.Info
): Promise<ResultOutput> {
  const data = await client.request(TeamMutation.createTeamMutation, teamInfo);
  return data.createTeam;
}
