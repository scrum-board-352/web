const sendEmailQuery = `
query sendEmailToInviteReceiverJoinTeam($receiverMail: String!, $receiver: String!, $teamId: String!) {
  sendEmailToInviteReceiverJoinTeam(selectionInput: {
    emailInput: {
      receiverMail: $receiverMail
      receiver: $receiver
      teamId: $teamId
  }
}){
    success: susses
    message
  }
}
`;

const selectTeamByUser = `
query selectTeamByUser($username: String!){
  selectTeamByUsername(selectionInput: {
    userInput: {
      username: $username
    }
  }) {
    id
    name: teamname
    creator
    description
  }
}
`;

export default { sendEmailQuery, selectTeamByUser };
