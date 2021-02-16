import { db } from "../database/db.js";
import { UserController } from "./user-controller.js";
import { crypt } from "../utils/crypt.js";

const userController = new UserController();
// const userCookie = new UserCookie();
let user;
let email;
let password;

const requestedUrl = document.location.href;
window.onload = () => {
  checkSession();
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

function notSignedIn() {}

function checkPass(user, password) {
  console.log(user, password);
  console.log(crypt.decrypt(user.password));
  console.log(crypt.encrypt(password));
  return crypt.decrypt(user.password) == password;
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

//checkSession("bobthegreat@gmail.co");
