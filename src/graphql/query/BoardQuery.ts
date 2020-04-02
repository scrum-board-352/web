const selectBoardsByProjectIdQuery = `
query selectBoardsByProjectId($projectId: String!){
  selectBoardsByProjectId(selectionInput: {
    boardInput: {
      projectId: $projectId
    }
  }) {
    id
    createTime
  }
}
`;

export default { selectBoardsByProjectIdQuery };
