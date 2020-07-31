const createTeamMutation = `
mutation createTeam($creator:String, $name:String, $description: String, $authCheckInput: AuthCheckInput){
  createTeam(selectionInput: {
    teamInput: {
      creator: $creator
      teamname: $name
      description: $description
    }
    authCheckInput: $authCheckInput
  }){
    id
    name: teamname
    creator
    description
  }
}
`;
const updateTeam = `
mutation updateTeam($id:String, $creator:String, $name:String, $description:String, $authCheckInput: AuthCheckInput){
    updateTeam(selectionInput: {
    teamInput: {
      id: $id
      creator: $creator
      teamname: $name
      description: $description
    }
    authCheckInput: $authCheckInput
  }){
    id
    name: teamname
    creator
    description
  }
}
`;

const removeTeam = `
mutation removeTeam($teamId: String, $authCheckInput: AuthCheckInput){
  removeTeam(selectionInput: {
    teamInput: {
      id: $teamId
    }
    authCheckInput: $authCheckInput
  }) {
    success
    message
  }
}
`;

export default { createTeamMutation, updateTeam, removeTeam };
