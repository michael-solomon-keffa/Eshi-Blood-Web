import { db } from "../database/db.js";
import { EventController } from "../controllers/event-controller.js";

const eventController = new EventController();
const eventCode = $("#eventcode").val();

function isValidEventCode(eventCode) {
  const idList = eventController.getAllEventsId().then((eventCode) => {});
}

function makeappointment(e) {}

function registerUser(e) {
  e.preventDefault();

  const eventCode = document.getElementById("eventcode").value;
  const userId = 78;

  eventController
    .registerUserToEvent(userId, parseInt(eventCode))
    .then((isRegistered) => {
      console.log(isRegistered);
    });

  console.log("here");
}

const form = document.getElementById("");

const event_form = document.getElementById("register-user-event");
event_form.addEventListener("submit", registerUser);
