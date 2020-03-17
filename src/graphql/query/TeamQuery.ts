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

export default { sendEmailQuery };
