import { EventController } from "../controllers/event-controller.js";
import { Event } from "../models/Event.js";

// checking session
import { crypt } from "../utils/crypt.js";

//evnt listnrs
const totalEventsText = document.querySelector(".total-events");
const totalActiveText = document.querySelector(".total-active");
const totalEventsThisMonthText = document.querySelector(".total-events-month");
const totalSuccessText = document.querySelector(".total-success");

window.onload = () => {
  checkSession();
  if (checkSession()) {
    document.body.style.removeProperty("display");
  }
};

let email;

function checkSession() {
  // console.log("running");
  if (Cookies.get("_emeshi")) {
    email = crypt.decrypt(Cookies.get("_emeshi"));
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    // console.log(Cookies.get("_emeshi"));
    return true;
  } else {
    window.location.replace("http://127.0.0.1:5502/index.html");
    return false;
  }
}

const eventController = new EventController();
updateCards();
async function updateCards() {
  let cardData = await eventController.getEventCardData();
  console.log(cardData);
  totalEventsText.innerText = cardData.totalEvents;
  totalActiveText.innerText = cardData.totalActiveEvents;
  totalEventsThisMonthText.innerText = cardData.eventsInThisMonth;
  totalSuccessText.innerText = cardData.totalSuccessEvents;
}

let dataSet = [];

let example = document.getElementById("example");
