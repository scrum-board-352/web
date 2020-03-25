const createProject = `
mutation createProjec($creator: String, $name: String, $teamId: String, $col: [String], $row: [String], $iteration: Int){
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
    success: susses
    message
  }
}
`;

const updateProject = `
mutation updateProject($id: String, $name: String, $teamId: String, $col: [String], $row: [String], $iteration: Int){
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
    success: susses
    message
  }
}
`;

const removeProject = `
mutation removeProject($projectId: String){
  removeProject(projectId: $projectId) {
    success: susses
    message
  }
}
`;
export default { createProject, updateProject, removeProject };
