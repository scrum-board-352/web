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
    announcer{
      id
      name: username
      avatar: icon
    }
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
    announcer{
      id
      name: username
      avatar: icon
    }
    receiver
    updateTime
    cardId
    read
  }
}
`;

const removeComment = `
mutation removeCommit($commitId: String){
  removeCommit(selectionInput: {
    commitInput: {
      id: $commitId
    }
  }) {
    success: susses
    message
  }
}
`;

export default { createComment, updateComment, removeComment };
