const selectCardsByBoardId = `
query selectCardsByBoardId($boardId: String!, $authCheckInput: AuthCheckInput){
  selectCardsByBoardId(selectionInput: {
    cardInput: {
      boardId: $boardId
    }
    authCheckInput: $authCheckInput
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
