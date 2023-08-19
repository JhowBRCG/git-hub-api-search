import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";


document.querySelector(".header__button").addEventListener('click', () => {
  const userName = document.querySelector(".header__input").value;
  if(validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.querySelector('.header__input').addEventListener('keyup', (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if(isEnterKeyPressed) {
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if(userName.length === 0) {
    alert("The field is empty, please put a username")
    return true;
  };
}

async function getUserData(userName) {

  const userResponse = await getUser(userName);

  if(userResponse.message === "Not Found") return screen.renderNotFound();
    
  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsResponse);
    
  screen.renderUser(user);
}








