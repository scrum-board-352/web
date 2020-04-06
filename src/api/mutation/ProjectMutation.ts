const createProject = `
mutation createProjec($creator: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int, $uid: String){
  createProject(selectionInput: {
    projectInput: {
      creator: $creator
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
      
    }
    uid: $uid
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
mutation updateProject($id: String, $name: String, $teamId: String, $col: String, $row: String, $iteration: Int, $uid: String){
  updateProject(selectionInput: {
    projectInput: {
      id: $id
      projectName: $name
      teamId: $teamId
      colTitle: $col
      rowTitle: $row
      iteration: $iteration
    }
    uid: $uid
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
mutation removeProject($projectId: String, $uid: String){
  removeProject(selectionInput: {
    projectInput: {
      id: $projectId
    }
    uid: $uid
  }) {
    success: susses
    message
  }
}
`;
export default { createProject, updateProject, removeProject };
