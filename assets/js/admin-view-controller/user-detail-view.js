import { DonorController } from "../controllers/donor-controller.js";

import { crypt } from "../utils/crypt.js";

window.onload = () => {
  checkSession();
  if (checkSession()) {
    document.body.style.removeProperty("display");
  }
};

let email;

function checkSession() {
  console.log("running");
  if (Cookies.get("_emeshi")) {
    email = crypt.decrypt(Cookies.get("_emeshi"));
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    console.log(Cookies.get("_emeshi"));
    return true;
  } else {
    window.location.replace("https://michael-pi-max.github.io/Eshi-Blood-Web/");
    return false;
  }
}
const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace("https://michael-pi-max.github.io/Eshi-Blood-Web/");
};

document.getElementById("logout").addEventListener("click", logout);

let donorController = new DonorController();
const urlParams = new URLSearchParams(window.location.search);

let userDetailView = document.getElementById("user-detail");
let detailTable = document.getElementById("donationTable");
let userId = Number(urlParams.get("id"));

let element;
let activateButton;

function activateUser() {
  donorController.activateUser(userId).then(() => {
    console.log("yes");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  function deleted(e) {
    // traverse to the eventid element in the dom
    let id = parseInt(
      e.target.parentElement.parentElement.parentElement.children[0].innerText
    );
    // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText
    eventController.deleteEvent(id).then((_event) => {
      if (_event) {
      }
    });
  }
});

const populateData = () => {
  donorController
    .getDonor(userId)
    .then((donors) => {
      const donor = donors[0];
      console.log(userId);
      console.log(donor);
      let activated;
      if (donor.activated) {
        activated = "disabled";
      } else {
        activated = "";
      }

      element = `<div class="col-md-4 order-md-1 mt-4">
    <div class="card card-profile rainbow">
      <div class="row mx-auto">
        <div class="col-md-3 order-md-2">
          <div class="card-profile-image">
            <a href="">
              <img
                src="/assets/images/blood-types/${donor.blood_type}.webp"
                class="rounded-circle"
                alt=""
                width="150px"
                height="100px"
              />
            </a>
          </div>
        </div>
      </div>
      <div
        class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
      >
        <div class="d-flex justify-content-between">
          <a
            type="button"
            href=""
            id="activate"
            class="btn btn-sm btn-outline-info mr-4 ${activated}"
            style="background: #3f51b5; color: white"
            >Activate</a
          >
          <a
            type="button"
            href=""
            class="btn btn-sm btn-success float-right"
            style="background: #66bb6a; color: black"
            >Message</a
          >
        </div>
      </div>
      <div class="card-body pt-0">
        <div class="row mx-auto">
          <div class="col justify-content-between">
            <div
              class="card-profile-stats d-flex justify-content-center py-2"
            >
              <div class="pr-2">
                <span class="heading text-center">${donor.blood_type}</span>
                <span class="description">Blood type</span>
              </div>
              <div class="pr-2">
                <span class="heading text-center">${
                  donor.donations.length
                }</span>
                <span class="description">Donations</span>
              </div>
              <div class="pr-2">
                <span class="heading text-center">${
                  donor.appointments.length
                }</span>
                <span class="description">Appointments</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <h5 class="h3">
          ${donor.name} 
          <span class="font-weight-light">Age - ${donor.getAge()}</span>
          </h5>
          <div class="h5 font-weight-300">
            <i class="ni location_pin mr-2"></i>
          </div>
          <div class="h5 mt-2">
            <i class="ni business_briefcase-24 mr-2"></i>
            Age -${donor.getAge()}
          </div>
        </div>
      </div>
    </div>
    </div>`;
      const wrapper = document.createElement("div");
      wrapper.className = "col-lg-4 col-md-6 col-sm-12 mt-2";
      wrapper.innerHTML = element;
      userDetailView.append(wrapper);
      // activate

      activateButton = document.getElementById("activate");
      activateButton.addEventListener("click", activateUser);

      // donation table
      let renderDonationTable = function () {
        const donations = [];
        donor.donations.forEach((donation) => {
          let { id, date, createdAt } = donation;
          donations.push([id, date, createdAt]);
        });

        $("#donationTable").DataTable({
          data: donations,
          columns: [
            { title: "Donation Id" },
            { title: "Donation Date" },
            { title: "created at" },
          ],
        });
      };
      let renderAptTable = function () {
        const apts = [];
        donor.appointments.forEach((apt) => {
          let {
            id,
            start_date,
            end_date,
            time,
            status,
            createdAt,
            updatedAt,
            // id_req,
            // id_event,
          } = apt;

          apts.push([
            id,
            start_date,
            end_date,
            time,
            status,
            createdAt,
            updatedAt,
            // id_req,
            // id_event,
          ]);
        });

        $("#appointmentTable").DataTable({
          data: apts,
          columns: [
            { title: "Apt Id" },
            { title: "Start Date" },
            { title: "End Date" },
            { title: "Time" },
            { title: "Status" },
            { title: "Created At" },
            { title: "Updated At" },
            // { title: "Request" },
            // { title: "Event" },
          ],
        });
      };

      renderDonationTable();
      renderAptTable();
    })
    .catch(() => {
      element = `<h1 class="mt-5">Sorry! No Donor Found with this ID</h1>`;
      const wrapper = document.createElement("div");
      wrapper.className = "mt-5";
      wrapper.innerHTML = element;
      userDetailView.appendChild(wrapper);
    });
};

populateData();
