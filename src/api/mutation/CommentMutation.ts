const createComment = `
mutation createCommit($description: String, $announcer: String, $receiver: String, $cardId: String, $uid: String){
  createCommit(selectionInput: {
    commitInput: {
      description:$description
      announcer:$announcer
      receiver:$receiver
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
    receiver
    updateTime
    cardId
    read
  }
}
`;

const updateComment = `
mutation updateCommit($description: String, $read: Boolean, $id: String, $uid: String){
  updateCommit(selectionInput: {
    commitInput: {
      description: $description
      read: $read
      id: $id
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
    receiver
    updateTime
    cardId
    read
  }
}
`;

const removeComment = `
mutation removeCommit($commitId: String, $uid: String){
  removeCommit(selectionInput: {
    commitInput: {
      id: $commitId
    }
    uid: $uid
  }) {
    success
    message
  }
}
`;

export default { createComment, updateComment, removeComment };
