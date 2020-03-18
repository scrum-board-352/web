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
const updateTeam = `
mutation updateTeam($id:String, $creator:String, $name:String, $description:String){
    updateTeam(selectionInput: {
    teamInput: {
      id: $id
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

export default { createTeamMutation, updateTeam };
