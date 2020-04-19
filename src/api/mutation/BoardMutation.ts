const createBoard = `
mutation createBoard($projectId: String, $uid: String) {
  createBoard(
    selectionInput: {
    boardInput: {
      projectId: $projectId
    }
    uid: $uid
  }){
  	id
    createTime
  }
}
`;

const removeBoard = `
mutation removeBoard($boardId: String, $uid: String) {
  removeBoard(selectionInput: {
    boardInput: {
      id: $boardId
    }
    uid: $uid
  }) {
    success
    message
  }
}
`;
export default { createBoard, removeBoard };
