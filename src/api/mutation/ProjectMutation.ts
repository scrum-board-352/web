const createProject = `
mutation createProjec($creator: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int, $authCheckInput: AuthCheckInput){
  createProject(selectionInput: {
    projectInput: {
      creator: $creator
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
      
    }
    authCheckInput: $authCheckInput
  }){
    id
    name: projectName
    creator
    teamId
    createTime
    col: colTitle
    row: rowTitle
    iteration
  }
}
`;

const updateProject = `
mutation updateProject($id: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int, $authCheckInput: AuthCheckInput){
  updateProject(selectionInput: {
    projectInput: {
      id: $id
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
    }
    authCheckInput: $authCheckInput
  }){
    id
    name: projectName
    creator
    teamId
    createTime
    col: colTitle
    row: rowTitle
    iteration
  }
}
`;

const removeProject = `
mutation removeProject($projectId: String, $authCheckInput: AuthCheckInput){
  removeProject(selectionInput: {
    projectInput: {
      id: $projectId
    }
    authCheckInput: $authCheckInput
  }) {
    success
    message
  }
}
`;
export default { createProject, updateProject, removeProject };
