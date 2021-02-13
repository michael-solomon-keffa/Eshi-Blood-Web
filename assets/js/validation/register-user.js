import { db } from "../database/db.js";
import {DonorController} from "../controllers/donor-controller.js";
import { Donor } from "../models/Donor.js";

function isValidUser() {
  $(".error").remove();
  let error = false;

  const fullName = $("#name").val();
  const email = $("#email").val();
  const phoneNumber = $("#phoneNumber").val();
  const bloodType = $("#bloodType").val();

  const city = $("#city").val();
  const woreda = $("#woreda").val();
  const password = $("#password").val();
  const confirmPassword = $("#passwordConfirmation").val();

  // length greater than zero
  if (fullName.length < 1) {
    error = false;
    $("#name").after(
      '<div style="color: red;" class="error">Please provide your full name.</div>'
    );
  }
  if (email.length < 1) {
    error = false;
    $("#email").after(
      '<span style="color: red;" class="error">Please provide your email.</span>'
    );
  }
  // if (bloodType.length < 1) {
  //   error = false;
  //   $("#bloodType").after(
  //     '<span style="color: red;" class="error">Please provide your blood type.</span>'
  //   );
  // }
  if (phoneNumber.length < 8) {
    error = false;
    $("#phoneNumber").after(
      '<span style="color: red;" class="error">Please provide your phone number.</span>'
    );
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
  }
  if (confirmPassword.length < 1) {
    error = false;
    $("#passwordConfirmation").after(
      '<span style="color: red;" class="error">Please provide passwordConfirmation.</span>'
    );
  }

  // firstName validation
  if (!isNaN(fullName)) {
    error = false;
    $("#name").after(
      '<span style="color: red;" class="error">Please provide correct Full name.(Do not Use numbers)</span>'
    );
  }
  if (fullName.length < 8) {
    error = false;
    $("#name").after(
      '<span style="color: red;" class="error">Full Name must have more than 8 characters.</span>'
    );
  }

  // email validation
  if ($("#email").val().length < 1 ) {
    $("#email").after(
      '<span style="color: red;" class="error">Please provide email.</span>'
    );
    error = false;
  } else {
    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regEx.test($("#email").val());
    if (!validEmail) {
      $("#email").after(
        '<span style="color: red;" class="error">Please provide valid email.</span>'
      );
      error = false;
    }
  }

  // phone number
  if (isNaN(phoneNumber)) {
    error = false;
    $("#phoneNumber").after(
      '<span style="color: red;" class="error">Please provide correct phone number.(Use numbers)</span>'
    );
  }

  return error;
}

function registerUser(e) {
  e.preventDefault();

  const data = new FormData(e.target);

  if (isValidUser()) {
    const response = Object.fromEntries(data.entries());
    const donor = new Donor();
    donor.save(response).then(()=>{
      console.log("donor added")
    })
    console.log(response);
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerUser);
