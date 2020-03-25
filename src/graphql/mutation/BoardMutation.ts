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

const removeBoard = `
mutation removeBoard($boardId: String) {
  removeBoard(boardId: $boardId) {
    success: susses
    message
  }
}
`;
export default { createBoard, removeBoard };
