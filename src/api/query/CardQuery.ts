const selectCardsByBoardId = `
query selectCardsByBoardId($boardId: String!, $uid: String){
  selectCardsByBoardId(selectionInput: {
    cardInput: {
      boardId: $boardId
    }
    uid: $uid
  }){
    id
    createTime
    title
  	description
    priority
    storyPoints
    processor
    founder
    status
    number
  }
}
`;

export default { selectCardsByBoardId };
