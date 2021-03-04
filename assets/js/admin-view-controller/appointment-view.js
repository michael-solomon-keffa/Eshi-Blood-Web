import { AppointmentController } from "../controllers/appointment-controller.js";

// checking session
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
    window.location.replace(
      `${window.location.host}/${window.location.pathname}/index.html`
    );
    return false;
  }
}

const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace(
    `${window.location.host}/${window.location.pathname}/index.html`
  );
};

document.getElementById("logout").addEventListener("click", logout);

const appointmentController = new AppointmentController();
const totalAptsView = document.getElementById("totalAptsView");
const activeAptsView = document.getElementById("activeApts");
const aptsInThisWeekView = document.getElementById("aptsInThisMonth");
const successAptsView = document.getElementById("successApts");

const table = document.getElementById("aptTable");

let appointmentToBChange = 0;

document.addEventListener("DOMContentLoaded", () => {
  populateCardData();
  getData();
});

const populateCardData = () => {
  appointmentController.getAptCardData().then((data) => {
    activeAptsView.innerText = data.totalActiveApts;
    totalAptsView.innerText = data.totalApts;
    aptsInThisWeekView.innerText = data.aptsInThisMonth;
    successAptsView.innerText = data.successApts;
  });
};

const getData = (cb) => {
  let data = [];
  appointmentController.getAllAppointments().then((appointments) => {
    console.log(appointments);
    appointments.forEach((apt) => {
      let innerData = [];
      innerData.push(apt.id);
      innerData.push(apt.getStartDate());
      innerData.push(apt.getEndDate());
      innerData.push(apt.time);
      innerData.push(apt.status);
      innerData.push(apt.getDonorLink());
      innerData.push(apt.getDonationCenterLink());
      data.push(innerData);
    });
    renderTable(data);
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        appointmentToBChange = btn.classList[0];
      });
    });
  });
};

const renderTable = function (data) {
  $("#aptTable").DataTable({
    data: data,
    columns: [
      {
        title: "appointment id",
      },
      {
        title: "start date ",
      },
      {
        title: "end date",
      },
      {
        title: "time",
      },
      {
        title: "status",
      },
      {
        title: "donors id",
      },
      {
        title: "donation center",
      },
      // { title: "location" },
      {
        title: "Action",
        mRender: function (data, type, row) {
          return `<button  class="${row[0]} btn btn-warning accept" data-toggle="modal" data-target="#acceptModal"  title="Accept">
                    <i class="fa fa-check text-light accept"></i>
                    </button>
                <button  class="${row[0]} btn btn-success reject" data-toggle="modal" data-target="#rejectModal"  title="Success">
                    <i class="fa fa-check-circle text-light reject-inner"></i>
                </button>
                <button  class=" ${row[0]} btn btn-danger delete" data-toggle="modal" data-target="#deleteModal" title="Delete">
                    <i class="fa fa-trash text-light text-light delete-inner"></i>
                </button>
                    `;
        },
      },
    ],
  });
};

document.getElementById("accept-btn").addEventListener("click", acceptApt);
document.getElementById("success-btn").addEventListener("click", successApt);
document.getElementById("delete-btn").addEventListener("click", deleteApt);

function acceptApt() {
  const alertView = document.getElementById("accept-alert");
  appointmentController
    .updateStatus(appointmentToBChange, "accepted")
    .then(() => {
      alertView.firstElementChild.innerText = "Appointment Accepted";
      alertView.classList.toggle("alert-warning");
      alertView.classList.toggle("show");
      setTimeout(window.location.reload(), 2000);
    });
}

function successApt() {
  const alertView = document.getElementById("accept-alert");
  appointmentController
    .updateStatus(appointmentToBChange, "success")
    .then(() => {
      alertView.firstElementChild.innerText = "Appointment Successfully!";
      alertView.classList.toggle("alert-success");
      alertView.classList.toggle("show");
      setTimeout(window.location.reload(), 2000);
    });
}

function deleteApt() {
  const alertView = document.getElementById("accept-alert");
  appointmentController
    .deleteAppointment(appointmentToBChange)
    .then((deleted) => {
      console.log(deleted);
      alertView.firstElementChild.innerText = "Appointment Deleted";
      alertView.classList.toggle("alert-danger");
      alertView.classList.toggle("show");
      setTimeout(window.location.reload(), 2000);
    });
}

// const acceptAppointment = function()
