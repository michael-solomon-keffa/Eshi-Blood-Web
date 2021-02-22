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
    window.location.replace("http://127.0.0.1:5502/index.html");
    return false;
  }
}

const appointmentController = new AppointmentController();
const totalAptsView = document.getElementById("totalAptsView");
const activeAptsView = document.getElementById("activeApts");
const aptsInThisWeekView = document.getElementById("aptsInThisMonth");
const successAptsView = document.getElementById("successApts");

const table = document.getElementById("aptTable");

document.addEventListener("DOMContentLoaded", () => {
  function reject(e) {
    let appointmentId;
    // traverse to the eventid element in the dom
    if (e.target.classList.contains("reject")) {
      appointmentId =
        e.target.parentElement.parentElement.children[0].innerText;
      // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText
      console.log(appointmentId);
    }
    if (e.target.classList.contains("reject-inner")) {
      console.log(e.target.parentElement.parentElement.parentElement);
      appointmentId =
        e.target.parentElement.parentElement.parentElement.children[0]
          .innerText;
      // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText
      console.log(appointmentId);
    }
  }

  function accept(e) {
    // traverse to the eventid element in the dom
    let appointmentId =
      e.target.parentElement.parentElement.children[0].innerText;
    // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText
    console.log(appointmentId);
  }

  // table.addEventListener("click", buttonFunctions);

  // function buttonFunctions(e) {
  //   reject(e);
  //   accept(e);
  // }
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
      innerData.push(apt.start_date);
      innerData.push(apt.end_date);
      innerData.push(apt.time);
      innerData.push(apt.status);
      innerData.push(apt.getDonorLink());
      innerData.push(apt.getDonationCenterLink());
      data.push(innerData);
    });
    renderTable(data);
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
        title: "donor Id",
      },
      {
        title: "donation center",
      },
      // { title: "location" },
      {
        title: "Action",
        mRender: function (data, type, row) {
          // return `<button >${data}</button>`;
          // TODO   fas fa-edit
          return `<button onclick="accept(e)" class="btn btn-success accept ml-3" data-toggle="modal" data-target="#acceptModal"  title="Accept">
                    <i class="fa fa-check text-light accept"></i>
                </button> 
                <button   class="btn btn-warning reject" data-toggle="modal" data-target="#rejectModal"  title="Reject">
                    <i class="fa fa-times text-light reject-inner"></i>
                </button>
                <button   class="btn btn-danger delete" data-toggle="modal" data-target="#deleteModal" title="Delete">
                    <i class=" text-light delete-inner"></i>
                </button>
                    `;
        },
      },
    ],
  });
};
