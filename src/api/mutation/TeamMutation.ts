const createTeamMutation = `
  mutation createTeam($creator:String, $name:String, $description: String) {
    createTeam(selectionInput: {
      teamInput: {
        creator: $creator
        teamname: $name
        description: $description
      }
    }) {
      id
      name: teamname
      creator
      description
    }
  }
`;

const updateTeam = `
  mutation updateTeam($id: String, $creator: String, $name: String, $description: String) {
      updateTeam(selectionInput: {
      teamInput: {
        id: $id
        creator: $creator
        teamname: $name
        description: $description
      }
    }) {
      id
      name: teamname
      creator
      description
    }
  }
`;

const removeTeam = `
  mutation removeTeam($teamId: String) {
    removeTeam(selectionInput: {
      teamInput: {
        id: $teamId
      }
    }) {
      success
      message
    }
  }
`;

export default { createTeamMutation, updateTeam, removeTeam };
