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

const registerQuery = `
  query register($username: String!, $password: String!, $email: String!) {
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

export default {loginQuery, logoutQuery, registerQuery};