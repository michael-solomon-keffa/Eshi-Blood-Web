import { db } from "../database/db.js";
import { DonorController } from "../controllers/donor-controller.js";
import { UserController } from "../controllers/user-controller.js";
import { crypt } from "../utils/crypt.js";

const donorController = new DonorController();
const userController = new UserController();
let check = false;

function checkEmail(email) {
  userController.doesEmailExist(email).then((user) => {
    if (user) {
      check = true;
    } else {
      check = false;
    }
  });
  return check;
}

function isValidUser() {
  $(".error").remove();
  let error = true;

  const fullName = $("#name").val();
  const email = $("#email").val();
  const phoneNumber = $("#phoneNumber").val();
  const bloodType = $("#bloodType").val();

  const city = $("#city").val();
  const woreda = $("#woreda").val();
  const password = $("#password").val();
  const confirmPassword = $("#passwordConfirmation").val();

  // full name
  if (fullName.length < 1) {
    error = false;
    $("#name").after(
      '<div style="color: red;" class="error">Please provide your full name.</div>'
    );
  } else {
    if (fullName.length < 8) {
      error = false;
      $("#name").after(
        '<span style="color: red;" class="error">Full Name must have more than 8 characters.</span>'
      );
    } else if (!isNaN(fullName)) {
      error = false;
      $("#name").after(
        '<span style="color: red;" class="error">Please provide correct Full name.(Do not Use numbers)</span>'
      );
    }
  }

  if (email.length < 1) {
    error = false;
    $("#email").after(
      '<span style="color: red;" class="error">Please provide your email.</span>'
    );
  } else {
    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regEx.test($("#email").val());
    if (!validEmail) {
      $("#email").after(
        '<span style="color: red;" class="error">Please provide valid email.</span>'
      );
      error = false;
    } else {
      console.log(checkEmail(email));
      if (checkEmail(email)) {
        $("#email").after(
          '<span style="color: red;" class="error">Email already exists.</span>'
        );
        error = false;
      }
    }
  }

  if (phoneNumber.length < 8) {
    error = false;
    $("#phoneNumber").after(
      '<span style="color: red;" class="error">Please provide your phone number.</span>'
    );
  } else {
    if (isNaN(phoneNumber)) {
      error = false;
      $("#phoneNumber").after(
        '<span style="color: red;" class="error">Please provide correct phone number.(Use numbers)</span>'
      );
    }
  }
  if (city.length < 1) {
    error = false;
    $("#city").after(
      '<span style="color: red;" class="error">Please provide your city.</span>'
    );
  }
  if (woreda.length < 1) {
    error = false;
    $("#woreda").after(
      '<span style="color: red;" class="error">Please provide woreda.</span>'
    );
  }
  if (password.length < 1) {
    error = false;
    $("#password").after(
      '<span style="color: red;" class="error">Please provide Password.</span>'
    );
  } else {
    if (password.length < 8) {
      error = false;
      $("#password").after(
        '<span style="color: red;" class="error">Password must be greater than 8</span>'
      );
    }
  }
  if (confirmPassword.length < 1) {
    error = false;
    $("#passwordConfirmation").after(
      '<span style="color: red;" class="error">Please provide passwordConfirmation.</span>'
    );
  } else if (password !== confirmPassword) {
    error = false;
    $("#passwordConfirmation").after(
      '<span style="color: red;" class="error">Password does not much.</span>'
    );
  }

  return error;
}

function registerUser(e) {
  e.preventDefault();

  const data = new FormData(e.target);

  if (isValidUser()) {
    const response = Object.fromEntries(data.entries());

    const password = crypt.encrypt(response.password);

    const {
      name,
      email,
      blood_type,
      city,
      woreda,
      phone_number,
      birthdate,
    } = response;
    const donorInfo = {
      name,
      email,
      blood_type,
      city,
      woreda,
      phone_number,
      birthdate,
    };

    const userInfo = { email };
    db.transaction("rw", db.donors, db.users, function () {
      return donorController
        .save({
          ...donorInfo,
          activated: false,
          can_donate: false,
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          is_deleted: false,
        })
        .then((id_donor) => {
          userController.save({
            ...userInfo,
            password: password,
            id_donor: id_donor,
            is_admin: false,
          });
        });
    });
    console.log("registered");
    window.location.replace("/index.html?registered=true");
  }
}

const form = document.querySelector("form");
document.querySelectorAll("form").forEach((item) => {
  item.addEventListener("keyup", isValidUser);
});

form.addEventListener("submit", registerUser);
