const createTeamMutation = `
mutation createTeam($creator:String, $name:String, $description: String){
  createTeam(selectionInput: {
    teamInput: {
      creator: $creator
      teamname: $name
      description: $description
    }
  }){
    success: susses
    message
  }
}
`;

export default { createTeamMutation };
