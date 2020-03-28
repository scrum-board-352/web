const createCommit = `
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

const updateCommit = `
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

export default { createCommit, updateCommit };
