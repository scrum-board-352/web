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

export default { createCard };
