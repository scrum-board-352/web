const getCommentByReceiverQuery = `
  query getCommitByReceiver($receiver: String!, $authCheckInput: AuthCheckInput){
    getCommitByReceiver(selectionInput: {
      commitInput: {
        receiver:$receiver
      }
      authCheckInput: $authCheckInput
    }){
      info: commitType{
        id
        description
        announcer{
          id
          name: username
          avatar: icon
        }
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
  query selectCommentsByCardId($cardId: String!, $authCheckInput: AuthCheckInput){
    selectCommentsByCardId(selectionInput: {
      commitInput: {
        cardId:$cardId
      }
      authCheckInput: $authCheckInput
    }){
      id
      description
      announcer{
        id
    		name: username
    		avatar: icon
      }
      updateTime
      isRead: read
      cardId
    }
  }
`;

export default { getCommentByReceiverQuery, getCommentByCardId };
