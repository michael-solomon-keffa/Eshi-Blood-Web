import { db } from "../database/db.js";
import { UserController } from "./user-controller.js";
import { crypt } from "../utils/crypt.js";

db.open();

const userController = new UserController();
// const userCookie = new UserCookie();
const urlParams = new URLSearchParams(window.location.search);

let user;
let email;
let password;
const isFromSignUp = urlParams.get("registered");
let alertView = document.getElementById("alert");

const requestedUrl = document.location.href;
window.onload = () => {
  if (fromSignUp()) {
    if (checkSession()) {
    } else {
      document.body.style.removeProperty("display");
    }
  } else if (checkSession()) {
    document.body.style.setProperty("display", "none");
  } else {
    document.body.style.removeProperty("display");
  }
};

function checkSession() {
  if (Cookies.get("_emeshi")) {
    if (Cookies.get("_adeshi") == "true") {
      window.location.replace(
        "https://michael-pi-max.github.io/Eshi-Blood-Web//dashboard.html"
      );
    } else {
      window.location.replace(
        "https://michael-pi-max.github.io/Eshi-Blood-Web//users/index.html"
      );
    }
    return true;
  } else {
    email = Cookies.get("_emeshi");
    if (Cookies.get("_adeshi")) {
      window.location.replace(requestedUrl);
    }
    return false;
  }
}

function checkPass(user, password) {
  return crypt.decrypt(user.password) === password;
}

function fromSignUp() {
  if (isFromSignUp) {
    alertView.classList.add("show");
    alertView.classList.toggle("alert-success");
    alertView.innerText = "Registered! Please Sign In.";
    return true;
  }
}

function login(e) {
  e.preventDefault();
  console.log("here");

  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  userController.getUser(email).then((user) => {
    if (checkPass(user, password)) {
      userController.getUser(email).then((user) => {
        console.log(user.id_donor);
        Cookies.set("x", crypt.encrypt(password.toString()));
        Cookies.set("_emeshi", crypt.encrypt(user.id_donor.toString()), {
          expires: 3,
        });
        Cookies.set("_adeshi", user.is_admin, {
          expires: 3,
        });

        Cookies.set("_id", user.id, {
          expires: 3,
        });

        if (user.is_admin == true) {
          console.log("here");
          window.location.replace(
            "https://michael-pi-max.github.io/Eshi-Blood-Web//dashboard.html"
          );
        } else if (user.is_admin == false) {
          window.location.replace(
            "https://michael-pi-max.github.io/Eshi-Blood-Web//users/index.html"
          );
        }
      });
    } else {
      alertView.classList.add("show");
      alertView.classList.toggle("alert-warning");
      alertView.innerText = "Incorrect password or email!";
      return true;
    }
  });
}

function logout() {
  Cookies.remove("_emeshi");
}

const form = document.querySelector("form");
form.addEventListener("submit", login);
