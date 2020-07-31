const createCard = `
mutation createCard($title: String, 
  $description: String, 
  $storyPoints: Int, 
  $priority: String, 
  $processor: String, 
  $founder: String, 
  $status: String, 
  $boardId: String,
  $authCheckInput: AuthCheckInput) {
  createCard(selectionInput: {
    cardInput: {
      title: $title
      description:  $description
      storyPoints: $storyPoints
      priority: $priority
      processor: $processor
      founder: $founder
      status: $status
      boardId: $boardId
    }
    authCheckInput: $authCheckInput
  }){
    id
    createTime
    title
  	description
    priority
    storyPoints
    processor
    founder
    status
    number
  }
}
`;

const updateCard = `
mutation updateCard($id: String,
  $title: String, 
  $description: String, 
  $storyPoints: Int, 
  $priority: String, 
  $processor: String, 
  $status: String,
  $boardId: String,
  $authCheckInput: AuthCheckInput) {
  updateCard(selectionInput: {
    cardInput: {
      id: $id
      title: $title
      description:  $description
      storyPoints: $storyPoints
      priority: $priority
      processor: $processor
      status: $status
      boardId: $boardId
    }
    authCheckInput: $authCheckInput
  }){
    id
    createTime
    title
  	description
    priority
    storyPoints
    processor
    founder
    status
    number
  }
}
`;

const removeCard = `
mutation removeCard($cardId: String, $authCheckInput: AuthCheckInput){
  removeCard(selectionInput: {
    cardInput: {
      id: $cardId
    }
    authCheckInput: $authCheckInput
  }) {
    success
    message
  }
}

`;

export default { createCard, updateCard, removeCard };
