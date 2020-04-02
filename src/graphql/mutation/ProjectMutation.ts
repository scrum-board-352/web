const createProject = `
mutation createProjec($creator: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int){
  createProject(selectionInput: {
    projectInput: {
      creator: $creator
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
      
    }
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
mutation updateProject($id: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int){
  updateProject(selectionInput: {
    projectInput: {
      id: $id
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
    }
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
mutation removeProject($projectId: String){
  removeProject(selectionInput: {
    projectInput: {
      id: $projectId
    }
  }) {
    success: susses
    message
  }
}
`;
export default { createProject, updateProject, removeProject };
