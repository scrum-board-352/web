const selectBoardsByProjectIdQuery = `
query selectBoardsByProjectId($projectId: String!, $uid: String){
  selectBoardsByProjectId(selectionInput: {
    boardInput: {
      projectId: $projectId
    }
    uid: $uid
  }) {
    id
    createTime
  }
}
`;

export default { selectBoardsByProjectIdQuery };
