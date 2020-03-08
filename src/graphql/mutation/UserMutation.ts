const registerMutation = `
mutation register($username: String!, $password: String!, $email: String!) {
    register(selectionInput:{
      userInput: {
        username: $username
        password: $password
        email: $email
      }
    }){
      success: susses
  	  message
    }
  }
`;

const updateMutation = `
mutation updateUser($username: String!, $password: String, $power: String, $icon: String) {
  updateUser(selectionInput: {
    userInput: {
      username: $username
      password: $password
      power: $power
      icon: $icon
    }
  }){
    success: susses
    message
  }
}
`

export default {registerMutation, updateMutation};