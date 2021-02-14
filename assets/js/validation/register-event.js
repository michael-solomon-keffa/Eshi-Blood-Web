import { Event } from "../models/Event.js";

function isValidEvent() {}

function registerEvent(e) {
  e.preventDefault();

  const data = new FormData(e.target);

  if (true) {
    const response = Object.fromEntries(data.entries());

    const event = new Event();
    event
      .save({
        ...response,
        status: "rejected",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(() => {
        console.log("event added");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerEvent);
