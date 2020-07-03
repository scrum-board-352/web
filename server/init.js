const fetch = require("node-fetch");

const services = [
  "https://scrum-board-api-service.herokuapp.com",
  "https://scrum-board-project-service.herokuapp.com",
  "https://scrum-board-message-service.herokuapp.com",
  "https://scrum-board-people-service.herokuapp.com",
];

services.forEach((url) => {
  fetch(url)
    .then(() => console.log(`successfully awakened: ${url}`))
    .catch((error) =>
      console.error(`attempt to wake up service failed: ${error.message} (${url})`)
    );
});
