const selectCardsByBoardId = `
query selectCardsByBoardId($boardId: String!){
  selectCardsByBoardId(boardId: $boardId){
    id
    createTime
    title
  	description
    priority
    storyPoints
    processor
    founder
    status
  }
}
`;

export default { selectCardsByBoardId };
