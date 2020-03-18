const loginQuery = `
  query login($username: String!, $password: String!) {
    login(selectionInput: {
      userInput: {
        username: $username
        password: $password
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

const logoutQuery = `
  query logout($username: String!) {
  	logout(username: $username) {
      success: susses
  	  message
  	}
  }
`;

const selectUser = `
query selectUserBySubstring($usernameSubstring: String!){
  selectUserBySubstring(usernameSubstring: $usernameSubstring) {
    id
    name: username
    email
    avatar: icon
  }
}
`;
export default { loginQuery, logoutQuery, selectUser };
