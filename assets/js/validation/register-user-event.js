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
  const userId = parseInt(Cookies.get("_id"));

  const activeEvents = eventController.getActiveEventsId().then((_idList) => {
    console.log(_idList);
    const x = _idList.map((e) => e.id);
    return x;
  });

  activeEvents.then((_activeEvents) => {
    console.log(_activeEvents);
    if (_activeEvents.includes(parseInt(eventCode))) {
      eventController
        .registerUserToEvent(userId, parseInt(eventCode))
        .then((isRegistered) => {
          if (!isRegistered) {
            $("#eventcode").after(
              '<span class="text-warning error">Already registered</span> '
            );
            setTimeout(function () {
              $(".error").remove();
            }, 2350);
          } else {
            $("#eventcode").after(
              '<span class="text-success error">Registered</span> '
            );
            setTimeout(function () {
              $(".error").remove();
            }, 2350);
          }
        });
    } else {
      $("#eventcode").after(
        '<span class="text-warning error">Sorry! No event exist with this ID.</span> '
      );
      setTimeout(function () {
        $(".error").remove();
      }, 2350);
      console.log("no event");
    }
  });

  console.log("here");
}

const form = document.getElementById("");

const event_form = document.getElementById("register-user-event");
event_form.addEventListener("submit", registerUser);
