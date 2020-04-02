const createCard = `
mutation createCard($title: String, 
  $description: String, 
  $storyPoints: Int, 
  $priority: String, 
  $processor: String, 
  $founder: String, 
  $status: String, 
  $boardId: String) {
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
  $status: String) {
  updateCard(selectionInput: {
    cardInput: {
      id: $id
      title: $title
      description:  $description
      storyPoints: $storyPoints
      priority: $priority
      processor: $processor
      status: $status
    }
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
  }
}
`;

const removeCard = `
mutation removeCard($cardId: String){
  removeCard(selectionInput: {
    cardInput: {
      id: $cardId
    }
  }) {
    success: susses
    message
  }
}

`;

export default { createCard, updateCard, removeCard };
