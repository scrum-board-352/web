const sendEmailQuery = `
query sendEmailToInviteReceiverJoinTeam($receiverMail: String!, $receiver: String!, $teamId: String!, $authCheckInput: AuthCheckInput) {
  sendEmailToInviteReceiverJoinTeam(selectionInput: {
    emailInput: {
      receiverMail: $receiverMail
      receiver: $receiver
      teamId: $teamId
    }
    authCheckInput: $authCheckInput
}){
    success
    message
  }
}
`;

const selectTeamByUser = `
query selectTeamByUser($username: String!, $authCheckInput: AuthCheckInput){
  selectTeamByUsername(selectionInput: {
    userInput: {
      username: $username
    }
    authCheckInput: $authCheckInput
  }) {
    id
    name: teamname
    creator
    description
  }
}
`;

export default { sendEmailQuery, selectTeamByUser };
