const sendEmailQuery = `
query sendEmailToInviteReceiverJoinTeam($receiverMail: String!, $receiver: String!, $teamId: String!, $uid: String) {
  sendEmailToInviteReceiverJoinTeam(selectionInput: {
    emailInput: {
      receiverMail: $receiverMail
      receiver: $receiver
      teamId: $teamId
    }
    uid: $uid
}){
    success: susses
    message
  }
}
`;

const selectTeamByUser = `
query selectTeamByUser($username: String!, $uid: String){
  selectTeamByUsername(selectionInput: {
    userInput: {
      username: $username
    }
    uid: $uid
  }) {
    id
    name: teamname
    creator
    description
  }
}
`;

export default { sendEmailQuery, selectTeamByUser };
