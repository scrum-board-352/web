const createTeamMutation = `
mutation createTeam($creator:String, $name:String, $description: String, $uid: String){
  createTeam(selectionInput: {
    teamInput: {
      creator: $creator
      teamname: $name
      description: $description
    }
    uid: $uid
  }){
    id
    name: teamname
    creator
    description
  }
}
`;
const updateTeam = `
mutation updateTeam($id:String, $creator:String, $name:String, $description:String, $uid: String){
    updateTeam(selectionInput: {
    teamInput: {
      id: $id
      creator: $creator
      teamname: $name
      description: $description
    }
    uid: $uid
  }){
    id
    name: teamname
    creator
    description
  }
}
`;

const removeTeam = `
mutation removeTeam($id: String, $uid: String){
  removeTeam(selectionInput: {
    teamInput: {
      id: $id
    }
    uid: $uid
  }) {
    success: susses
    message
  }
}
`;

export default { createTeamMutation, updateTeam, removeTeam };
