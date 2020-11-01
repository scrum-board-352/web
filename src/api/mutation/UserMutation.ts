const registerMutation = `
  mutation register($username: String!, $password: String!, $email: String!) {
    register(selectionInput:{
      userInput: {
        username: $username
        password: $password
        email: $email
      }
    }) {
      success
      message
    }
  }
`;

const updateMutation = `
  mutation updateUser($username: String!, $password: String, $power: String, $avatar: String) {
    updateUser(selectionInput: {
      userInput: {
        username: $username
        password: $password
        power: $power
        icon: $avatar
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

export default { registerMutation, updateMutation };
