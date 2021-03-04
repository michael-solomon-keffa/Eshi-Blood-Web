import { EventController } from "../controllers/event-controller.js";
import { RequestController } from "../controllers/request-controller.js";
import { DonorController } from "../controllers/donor-controller.js";
import { AppointmentController } from "../controllers/appointment-controller.js";

import { crypt } from "../utils/crypt.js";
import { db } from "../database/db.js";
import { Appointment } from "../models/Appointment.js";

window.onload = () => {
  checkSession().then((check) => {
    if (check) {
      document.body.style.removeProperty("display");
    }
  });
};

const donorController = new DonorController();

let donorID;
let donor;

async function checkSession() {
  const requestedUrl = window.location.toString();
  if (Cookies.get("_emeshi")) {
    if (Cookies.get("_adeshi") == "true") {
      window.location.replace("http://127.0.0.1:5502/dashboard.html");
      return false;
    } else {
      donorID = crypt.decrypt(Cookies.get("_emeshi"));
      donor = await donorController.getDonor(parseInt(donorID));
      populateProfile(donor[0]);
      checkDonorStatus();
      return true;
    }
  } else {
    window.location.replace(
      `${window.location.host}/${window.location.pathname}/index.html`
    );
    return false;
  }
}

let disabled = "";

function checkDonorStatus() {}

// logout
const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace(
    `${window.location.host}/${window.location.pathname}/index.html`
  );
};

document.getElementById("logout").addEventListener("click", logout);

// events

const eventController = new EventController();
const eventListView = document.getElementById("eventListView");
const populateEvents = function () {
  eventController.getActiveEventsId().then((_events) => {
    if (_events.length === 0) {
      let element = `<h1 class="mt-5"> Sorry! No events found!</h1>`;
      const wrapper = document.createElement("div");
      wrapper.className = "mt-5";
      wrapper.innerHTML = element;
      eventListView.append(wrapper);
    } else {
      _events.forEach((_event) => {
        let element = `
          <li class="col-4-12 col-tablet-1-2 col-phablet-1-1 ae-4 fromLeft articles__article"
          style="--animation-order:1">
          <div class="fir-image-figure">
            <a class="" style="margin-right: 20px" rel="noopener" data-target="#Modal4"
            data-toggle="modal">
              <div class="ml-3"> Id <div class="mr-3"> ${
                _event.id
              } </div> </div>
            </a>
            
            <div>
              <div class="fig-author-figure-title"><strong>${
                _event.event_title
              }</strong></div>
              <div class="fig-author-figure-title">${
                _event.organizer_name
              }</div>
              <div class="fig-author-figure-title">${_event.start_date} - ${
          _event.end_date
        } </br> ${_event.event_goal ? _event.event_goal : 0} Blood Kits</div>
            </div>
          </div>
        </li>

        `;

        const wrapper = document.createElement("li");
        wrapper.className =
          "col-4-12 col-tablet-1-2 col-phablet-1-1 ae-4 fromLeft articles__article";
        wrapper.innerHTML = element;
        eventListView.append(wrapper);
      });
    }
  });
};

populateEvents();

// request
const requestController = new RequestController();
const requestListView = document.getElementById("request-list");
const populateRequestList = function () {
  requestController.getRequestByBloodType("O+").then((requests) => {
    if (requests.length === 0) {
      let element = `<h1 class="mt-5">Sorry! No Requests Found!</h1>`;
      const wrapper = document.createElement("div");
      wrapper.className = "mt-5";
      wrapper.innerHTML = element;
      requestListView.appendChild(wrapper);
    } else {
      requests.forEach((request) => {
        let element = `
              <img src="../assets/images/blood-types/${request.blood_type}.webp"
                alt="Photo of sunset" class="blood-type">
              <h5 class="card-title mt-3 mb-3">${request.units_needed} blood kits needed</h5><br>
              <div class="row" style="font-size: 16px;">
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-12">
                      <span>
                        Location
                      </span>
                    </div>
                    <div class="col-12">
                      <span>
                        Reason
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-12">
                      <span>
                        ${request.location}
                      </span>
                    </div>
                    <div class="col-12">
                      <span>
                        ${request.request_reason}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <div id="registerRequest" class=" share-accept-btn">
                <div class="">
                  <button type="button"  style="font-size: 18px;"
                    class="${request.id} btn accept-btn btn-outline-primary">Accept</button>
                </div>
                
              </div>
      
            `;

        const wrapper = document.createElement("div");
        wrapper.className = "card card-block px-2";
        wrapper.innerHTML = element;
        requestListView.append(wrapper);

        const registerRequestButton = document.querySelectorAll(
          "#registerRequest"
        );

        registerRequestButton.forEach((btn) => {
          btn.addEventListener("click", registerRequest);
        });
      });
    }
  });
};

function registerRequest(e) {
  const requestId = e.target.classList[0];

  requestController
    .registerRequest(78, parseInt(requestId))
    .then((registered) => {
      console.log(registered);
    });
}

populateRequestList();

// profile page

const userProfileView = document.getElementById("user-profile");

const populateProfile = function (donor) {
  const element = `
    <div class="col-sm-5 text-center">

      <div class="">
        <div class="d-flex flex-column">
          <img src="/assets/images/blood-types/${
            donor.blood_type
          }.webp" alt="Admin"
            class="rounded-circle mx-auto" width="120px">
        </div>
        <div class="mt-3">
          <h3 class="profile-content">${donor.name}</h3>
          <p>Age - ${donor.getAge()}</p>
          <p>${donor.city}, Ethiopia</p>
        </div>
      </div>

      <div class="row pl-2">
        <div class="col-12">
          
        </div>
      </div>
    </div>
    <div class="col-sm-7">
      <div class="row">
        <div class="col-12">
          <p>Basic Information</p>
        </div>
      </div>
      <div class="row info">
        <div class="col-5">
          <span class="fullName">Full Name</span>
        </div>
        <div class="col-7">
          <span>${donor.name}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <span class="email">Email</span>
        </div>
        <div class="col-7">
          <span>${donor.email}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <span class="phone">Phone</span>
        </div>
        <div class="col-7">
          <span>${donor.phone_number}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-5">
          <span class="adderss">Address</span>
        </div>
        <div class="col-7">
          <span>${donor.city}, Ethiopia</span>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-2">
          <p>Donation History</p>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p>Donation Event Name</p>
        </div>
        <div class="col-6">
          <p>Event Date</p>
        </div>
      </div>
    </div>
  `;
  const wrapper = document.createElement("div");
  wrapper.className = "row";
  wrapper.innerHTML = element;
  userProfileView.append(wrapper);
};

// appointment

const appointmentController = new AppointmentController();

const isValid = function () {};
const appointmentFormHolder = document.getElementById("s1");
const appointmentDetailHolder = document.getElementById("s2");
const aptDetailView = document.getElementById("apt-detail");
const aptForm = document.getElementById("apt-holder");

function submitForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const response = Object.fromEntries(data.entries());
  console.log(response.datetimes);
  let date = response.datetimes.split("-");
  console.log(date[0]);
  let startDate = date[0].toString();
  let endDate = date[1].toString();
  let time = date[0].split(" ")[1];
  donorID = parseInt(donorID);
  let apt = {
    start_date: startDate,
    end_date: endDate,
    time: time,
    id_donor: donorID,
  };
  appointmentController.save(apt).then((apt) => {
    appointmentController.getApt(parseInt(apt)).then((apt) => {
      let wrapper = document.createElement("ul");
      wrapper.className = "accordion-child";
      const element = ` 
      <div> Appointment Submitted </div>
      <div>
         Appointment Id -  ${apt.id} 
      </div>
      <div>
         Start Date -  ${apt.start_date} 
      </div>

      <div>
         End Date -  ${apt.end_date} 
      </div>

      <div>
         Start Time -  ${apt.start_date.split(" ")[1]} 
      </div>

      <div>
         End Time -  ${apt.end_date.split(" ")[1]} 
      </div>

      <div>
         Status -  ${apt.status} 
      </div>
  
    `;

      wrapper.innerHTML = element;

      aptDetailView.append(wrapper);
      appointmentDetailHolder.click();

      appointmentFormHolder.click();

      aptForm.style.pointerEvents = "none";
    });
  });
}

const form = document.getElementById("apt_form");
form.addEventListener("submit", submitForm);
