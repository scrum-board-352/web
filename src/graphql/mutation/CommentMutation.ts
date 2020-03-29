const createComment = `
mutation createCommit($description: String, $announcer: String, $receiver: String, $cardId: String){
  createCommit(selectionInput: {
    commitInput: {
      description:$description
      announcer:$announcer
      receiver:$receiver
      cardId:$cardId
    }
  }){
    id
    description
    announcer
    receiver
    updateTime
    cardId
    read
  }
}
`;

const updateComment = `
mutation updateCommit($description: String, $read: Boolean, $id: String){
  updateCommit(selectionInput: {
    commitInput: {
      description: $description
      read: $read
      id: $id
    }
  }){
    id
    description
    announcer
    receiver
    updateTime
    cardId
    read
  }
}
`;

const removeComment = `
mutation removeCommit($commitId: String){
  removeCommit(commitId: $commitId) {
    success: susses
    message
  }
}
`;

export default { createComment, updateComment, removeComment };
