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

export default { createProject };
