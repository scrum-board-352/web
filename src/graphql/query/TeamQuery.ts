const sendEmailQuery = `
query sendEmailToInviteReceiverJoinTeam($receiverMail: String!, $announcer: String!, $teamId: String!) {
  sendEmailToInviteReceiverJoinTeam(emailInput: {
    receiverMail: $receiverMail
    announcer: $announcer
    teamId: $teamId
  }){
    success: susses
    message
  }
}
`;

const selectTeamByUser = `
query selectTeamByUser($username: String!){
  selectTeamByUsername(username: $username) {
    id
    name: teamname
    creator
    description
  }
}
`;

export default { sendEmailQuery, selectTeamByUser };
