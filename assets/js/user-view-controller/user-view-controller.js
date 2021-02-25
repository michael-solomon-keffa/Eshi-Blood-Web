import { EventController } from "../controllers/event-controller.js";
import { RequestController } from "../controllers/request-controller.js";
import { DonorController } from "../controllers/donor-controller.js";

import { crypt } from "../utils/crypt.js";

window.onload = () => {
  const check = checkSession();
  if (check) {
    document.body.style.removeProperty("display");
  }
};

const donorController = new DonorController();

let donorID;
let donor;

async function checkSession() {
  if (Cookies.get("_emeshi")) {
    donorID = crypt.decrypt(Cookies.get("_emeshi"));
    donor = await donorController.getDonor(parseInt(donorID));
    populateProfile(donor[0]);
    console.log(donor);
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    console.log(Cookies.get("_emeshi"));
    return true;
  } else {
    window.location.replace("http://127.0.0.1:5502/index.html");
    return false;
  }
}

// eveents

const eventController = new EventController();
const populateEvents = function () {};

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
              <h5 class="card-title mt-3 mb-3">${request.unit_needed} blood kits needed</h5><br>
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

const userProfilView = document.getElementById("user-profile");

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
  userProfilView.append(wrapper);
};
