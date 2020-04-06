const getCommentByReceiverQuery = `
  query getCommitByReceiver($receiver: String!, $uid: String){
    getCommitByReceiver(selectionInput: {
      commitInput: {
        receiver:$receiver
      }
      uid: $uid
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
  query selectCommentsByCardId($cardId: String!, $uid: String){
    selectCommentsByCardId(selectionInput: {
      commitInput: {
        cardId:$cardId
      }
      uid: $uid
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
