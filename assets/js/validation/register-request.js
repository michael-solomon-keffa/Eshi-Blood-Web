import { RequestController } from "../controllers/request-controller.js";

function isValidUser() {}

function registerRequest(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  if (true) {
    const response = Object.fromEntries(data.entries());

    const request = new RequestController();
    request
      .save({
        ...response,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: false,
      })
      .then(() => {
        console.log("Request Added");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerRequest);
