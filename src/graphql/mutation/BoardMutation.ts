const createBoard = `
mutation createBoard($projectId: String) {
  createBoard(selectionInput: {
    boardInput: {
      projectId: $projectId
    }
  }){
  	success: susses
    message
  }
}
`;
export default { createBoard };
