import { EventController } from "../controllers/event-controller.js";
import { Event } from "../models/Event.js";

// checking session
import { crypt } from "../utils/crypt.js";

//evnt listnrs
const totalEventsText = document.querySelector(".total-events");
const totalActiveText = document.querySelector(".total-active");
const totalEventsThisMonthText = document.querySelector(".total-events-month");
const totalSuccessText = document.querySelector(".total-success");

window.onload = () => {
  checkSession();
  if (checkSession()) {
    document.body.style.removeProperty("display");
  }
};

let email;

function checkSession() {
  // console.log("running");
  if (Cookies.get("_emeshi")) {
    email = crypt.decrypt(Cookies.get("_emeshi"));
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    // console.log(Cookies.get("_emeshi"));
    return true;
  } else {
    window.location.replace("https://michael-pi-max.github.io/Eshi-Blood-Web/");
    return false;
  }
}

const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace("https://michael-pi-max.github.io/Eshi-Blood-Web");
};
document.getElementById("logout").addEventListener("click", logout);

let eventToBeChanged = 0;

const eventController = new EventController();
updateCards();
async function updateCards() {
  let cardData = await eventController.getEventCardData();
  console.log(cardData);
  totalEventsText.innerText = cardData.totalEvents;
  totalActiveText.innerText = cardData.totalActiveEvents;
  totalEventsThisMonthText.innerText = cardData.eventsInThisMonth;
  totalSuccessText.innerText = cardData.totalSuccessEvents;
}

const getData = (cb) => {
  let data = [];
  eventController.getAllEvents().then((events) => {
    console.log(events);
    events.forEach((_event) => {
      let innerData = [];
      innerData.push(_event.id);
      innerData.push(_event.event_title);
      innerData.push(_event.event_location);
      innerData.push(_event.organizer_name);
      innerData.push(_event.organizer_number);
      innerData.push(_event.event_goal);
      innerData.push(_event.start_date);
      innerData.push(_event.end_date);
      innerData.push(_event.status);
      innerData.push(_event.getDonorsLink());
      data.push(innerData);
    });
    renderTable(data);
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        eventToBeChanged = btn.classList[0];
      });
    });
  });
};
const renderTable = function (data) {
  $("#event-table").DataTable({
    data: data,
    columns: [
      {
        title: "id",
      },
      {
        title: "event title",
      },
      {
        title: "location",
      },
      {
        title: "organizer name",
      },
      {
        title: "O. number",
      },
      {
        title: "goal",
      },
      {
        title: "start date",
      },
      {
        title: "end date",
      },
      { title: "status" },
      { title: "donors id" },
      {
        title: "Action",
        mRender: function (data, type, row) {
          return `<button  class="${row[0]} btn btn-success accept" data-toggle="modal" data-target="#acceptModal"  title="Success">
                    <i class="fa fa-check text-light accept"></i>
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

document.getElementById("success-btn").addEventListener("click", successApt);
document.getElementById("delete-btn").addEventListener("click", deleteApt);

function successApt() {
  const alertView = document.getElementById("accept-alert");
  eventController.updateStatus(eventToBeChanged, "success").then(() => {
    alertView.firstElementChild.innerText = "Event Successfully!";
    alertView.classList.toggle("alert-success");
    alertView.classList.toggle("show");
    setTimeout(window.location.reload(), 2000);
  });
}

function deleteApt() {
  const alertView = document.getElementById("accept-alert");
  eventController.deleteEvent(eventToBeChanged).then((deleted) => {
    console.log(deleted);
    alertView.firstElementChild.innerText = "Event Deleted";
    alertView.classList.toggle("alert-danger");
    alertView.classList.toggle("show");
    setTimeout(window.location.reload(), 2000);
  });
}

getData();
