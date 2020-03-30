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

export default { getCommentByReceiverQuery };
