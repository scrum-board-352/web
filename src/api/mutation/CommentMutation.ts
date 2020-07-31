const createComment = `
mutation createCommit($description: String, $announcer: String, $receiver: String, $cardId: String, $authCheckInput: AuthCheckInput){
  createCommit(selectionInput: {
    commitInput: {
      description:$description
      announcer:$announcer
      receiver:$receiver
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
    receiver
    updateTime
    cardId
    read
  }
}
`;

const updateComment = `
mutation updateCommit($description: String, $read: Boolean, $id: String, $authCheckInput: AuthCheckInput){
  updateCommit(selectionInput: {
    commitInput: {
      description: $description
      read: $read
      id: $id
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
    receiver
    updateTime
    cardId
    read
  }
}
`;

const removeComment = `
mutation removeCommit($commitId: String, $authCheckInput: AuthCheckInput){
  removeCommit(selectionInput: {
    commitInput: {
      id: $commitId
    }
    authCheckInput: $authCheckInput
  }) {
    success
    message
  }
}
`;

export default { createComment, updateComment, removeComment };
