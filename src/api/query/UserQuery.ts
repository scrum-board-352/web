const loginQuery = `
  query login($username: String!, $password: String!, $uid: String) {
    login(selectionInput: {
      userInput: {
        username: $username
        password: $password
      }
      uid: $uid
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

const logoutQuery = `
  query logout($username: String!, $uid: String) {
  	logout(selectionInput: {
      userInput: {
        username: $username
      }
      uid: $uid
    }) {
      success
  	  message
  	}
  }
`;

const selectUser = `
query selectUserBySubstring($usernameSubstring: String!, $uid: String){
  selectUserBySubstring(selectionInput: {
    userInput: {
      username: $usernameSubstring
    }
    uid: $uid
  }) {
    id
    name: username
    email
    avatar: icon
  }
}
`;

const selectPeopleByTeamId = `
query selectPeopleByTeamId($teamId: String!, $uid: String){
  selectPeopleByTeamId(selectionInput: {
    teamInput: {
      id: $teamId
    }
    uid: $uid
  }) {
    id
    name: username
    email
    avatar: icon
  }
}
`;
export default { loginQuery, logoutQuery, selectUser, selectPeopleByTeamId };
