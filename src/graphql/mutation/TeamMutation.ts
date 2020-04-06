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

export default { createTeamMutation, updateTeam };
