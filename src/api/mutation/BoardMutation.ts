const createBoard = `
mutation createBoard($projectId: String, $authCheckInput: AuthCheckInput) {
  createBoard(
    selectionInput: {
    boardInput: {
      projectId: $projectId
    }
    authCheckInput: $authCheckInput
  }){
  	id
    createTime
  }
}
`;

const removeBoard = `
mutation removeBoard($boardId: String, $authCheckInput: AuthCheckInput) {
  removeBoard(selectionInput: {
    boardInput: {
      id: $boardId
    }
    authCheckInput: $authCheckInput
  }) {
    success
    message
  }
}
`;
export default { createBoard, removeBoard };
