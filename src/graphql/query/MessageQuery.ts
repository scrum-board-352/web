const getCommitByReceiverQuery = `
  query getCommitByReceiver($receiver: String!) {
    getCommitByReceiver(receiver: $receiver) {
      id
      description
      announcer
      updateTime
      isRead: read
    }
  }
`;

export default { getCommitByReceiverQuery };
