import { RequestController } from "../controllers/request-controller.js";

function isValidEvent() {}

const alert = document.getElementById("submitAlert");
const request = new RequestController();

function submitRequest(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  if (true) {
    const response = Object.fromEntries(data.entries());

    request
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
        alert.children[0].innerText = "Request Added!";

        console.log("Request Added");
      })
      .catch(() => {
        alert.classList.replace("alert-success", "alert-danger");
        alert.children[0].innerText = "Adding request failed please try again!";
        alert.classList.add("show");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", submitRequest);

function register() {
  request
    .registerRequest(76, 19)
    .then(() => {
      console.log("success");
    })
    .catch(() => {
      console.log("failed");
    });
}

register();
