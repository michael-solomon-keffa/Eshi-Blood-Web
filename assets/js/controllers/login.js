import { db } from "../database/db.js";
import { UserController } from "./user-controller.js";
import { crypt } from "../utils/crypt.js";

const userController = new UserController();
// const userCookie = new UserCookie();
const urlParams = new URLSearchParams(window.location.search);

let user;
let email;
let password;
const isFromSignUp = urlParams.get("registered");
console.log(isFromSignUp);
let alertView = document.getElementById("alert");

const requestedUrl = document.location.href;
window.onload = () => {
  if (fromSignUp()) {
    document.body.style.removeProperty("display");
  } else if (checkSession()) {
    document.body.style.removeProperty("display");
  }
};

function checkSession() {
  if (Cookies.get("_emeshi")) {
    console.log(Cookies.get("_emeshi"));
    window.location.replace("http://127.0.0.1:5502/dashboard.html");
    return false;
  } else {
    email = Cookies.get("_emeshi");
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    return true;
  }
}

function checkPass(user, password) {
  return crypt.decrypt(user.password) === password;
}

function fromSignUp() {
  if (isFromSignUp) {
    alertView.classList.add("show");
    return true;
  }
}

function login(e) {
  e.preventDefault();
  console.log("here");

  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  userController.getUser(email).then((user) => {
    if (checkPass(user, password)) {
      Cookies.set("_emeshi", crypt.encrypt(email), { expires: 3 });
      window.location.replace("http://127.0.0.1:5502/dashboard.html");
    } else {
      console.log("error");
    }
  });
}

function logout() {
  Cookies.remove("_emeshi");
}

const form = document.querySelector("form");
form.addEventListener("submit", login);
