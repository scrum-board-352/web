const loginQuery = `
  query login($username: String!, $password: String!, $authCheckInput: AuthCheckInput) {
    login(selectionInput: {
      userInput: {
        username: $username
        password: $password
      }
      authCheckInput: $authCheckInput
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

const logoutQuery = `
  query logout($username: String!, $authCheckInput: AuthCheckInput) {
  	logout(selectionInput: {
      userInput: {
        username: $username
      }
      authCheckInput: $authCheckInput
    }) {
      success
  	  message
  	}
  }
`;

const selectUser = `
query selectUserBySubstring($usernameSubstring: String!, $authCheckInput: AuthCheckInput){
  selectUserBySubstring(selectionInput: {
    userInput: {
      username: $usernameSubstring
    }
    authCheckInput: $authCheckInput
  }) {
    id
    name: username
    email
    avatar: icon
  }
}
`;

const selectPeopleByTeamId = `
query selectPeopleByTeamId($teamId: String!, $authCheckInput: AuthCheckInput){
  selectPeopleByTeamId(selectionInput: {
    teamInput: {
      id: $teamId
    }
    authCheckInput: $authCheckInput
  }) {
    id
    name: username
    email
    avatar: icon
  }
}
`;
export default { loginQuery, logoutQuery, selectUser, selectPeopleByTeamId };
