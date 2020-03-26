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
    success: susses
    message
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
    success: susses
    message
  }
}
`;

export default { createCard, updateCard };
