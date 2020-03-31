const getCommentByReceiverQuery = `
  query getCommitByReceiver($receiver: String!){
    getCommitByReceiver(receiver: $receiver){
      info: commitType{
        id
        description
        announcer
        updateTime
        isRead: read
        cardId
      }
      posInfo:commitPos{
        cardId
        boardId
        projectId
      }
    }
  }
`;

const getCommentByCardId = `
  query selectCommentsByCardId($cardId: String!){
    selectCommentsByCardId(cardId: $cardId){
      id
      description
      announcer
      updateTime
      isRead: read
      cardId
    }
  }
`;

export default { getCommentByReceiverQuery, getCommentByCardId };
