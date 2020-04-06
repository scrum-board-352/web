const registerMutation = `
mutation register($username: String!, $password: String!, $email: String!, $uid: String) {
    register(selectionInput:{
      userInput: {
        username: $username
        password: $password
        email: $email
      }
      uid: $uid
    }){
      success: susses
  	  message
    }
  }
`;

const updateMutation = `
mutation updateUser($username: String!, $password: String, $power: String, $icon: String, $uid: String) {
  updateUser(selectionInput: {
    userInput: {
      username: $username
      password: $password
      power: $power
      icon: $icon
    }
    uid: $uid
  }){
      id
      name: username
      email
      avatar: icon
  }
}
`;

export default { registerMutation, updateMutation };
