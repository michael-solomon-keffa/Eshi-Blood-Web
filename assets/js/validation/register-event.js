import { EventController } from "../controllers/event-controller.js";

function isValidEvent() {}

const alert = document.getElementById("submitAlert");

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
        alert.classList.replace("alert-danger", "alert-success");
        alert.classList.add("show");
        alert.children[0].innerText = "Event Added!";

        console.log("Request Added");
      })
      .catch(() => {
        alert.classList.replace("alert-success", "alert-danger");
        alert.children[0].innerText = "Adding Event failed please try again!";
        alert.classList.add("show");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerEvent);
