import { EventController } from "../controllers/event-controller.js";

function isValidEvent() {}

function registerEvent(e) {
  e.preventDefault();

  const data = new FormData(e.target);

  if (true) {
    const response = Object.fromEntries(data.entries());

    const eventController = new EventController();
    console.log(response);
    eventController
      .save({
        ...response,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: false,
      })
      .then(() => {
        console.log("event added");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerEvent);
