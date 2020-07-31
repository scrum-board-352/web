const selectBoardsByProjectIdQuery = `
query selectBoardsByProjectId($projectId: String!, $authCheckInput: AuthCheckInput){
  selectBoardsByProjectId(selectionInput: {
    boardInput: {
      projectId: $projectId
    }
    authCheckInput: $authCheckInput
  }) {
    id
    createTime
  }
}
`;

export default { selectBoardsByProjectIdQuery };
