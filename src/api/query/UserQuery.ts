const loginQuery = `
  query login($username: String!, $password: String!) {
    login(selectionInput: {
      userInput: {
        username: $username
        password: $password
      }
    }) {
      userOutput {
        id
        name: username
        email
        avatar: icon
      }
      token
    }
  }
`;

const logoutQuery = `
  query logout($username: String!) {
  	logout(selectionInput: {
      userInput: {
        username: $username
      }
    }) {
      success
  	  message
  	}
  }
`;

const selectUser = `
  query selectUserBySubstring($usernameSubstring: String!) {
    selectUserBySubstring(selectionInput: {
      userInput: {
        username: $usernameSubstring
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

const selectPeopleByTeamId = `
  query selectPeopleByTeamId($teamId: String!) {
    selectPeopleByTeamId(selectionInput: {
      teamInput: {
        id: $teamId
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

export default { loginQuery, logoutQuery, selectUser, selectPeopleByTeamId };
