const selectBoardsByProjectIdQuery = `
query selectBoardsByProjectId($projectId: String!){
  selectBoardsByProjectId(projectId: $projectId) {
    id
    createTime
  }
}
`;

export default { selectBoardsByProjectIdQuery };
