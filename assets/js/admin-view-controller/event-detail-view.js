import { EventController } from "../controllers/event-controller.js";
import { Event } from "../models/Event.js";

const eventController = new EventController();

let dataSet = [];

let example = document.getElementById("example");

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

  function edit(e) {
    // traverse to the eventid element in the dom
    let eventId =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;
    // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText

    window.location.href = `/edit-event.html?${eventId}`;
  }

  function accept(e) {
    // traverse to the eventid element in the dom
    let eventId =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;
    // let userId = e.target.parentElement.parentElement.parentElement.children[1].innerText
  }

  example.addEventListener("click", buttonFunctions);

  function buttonFunctions(e) {
    console.log(e.target.parentElement);
    if (e.target.parentElement.classList.contains("accept")) {
      accept(e);
    }
    if (e.target.parentElement.classList.contains("delete")) {
      deleted(e);
    }
    if (e.target.parentElement.classList.contains("edit")) {
      edit(e);
    }
  }
});

eventController.getAllEvents().then((events) => {
  events.forEach((_event) => {
    dataSet.push([_event.id, ...Object.values(_event)]);
  });

  renderTable();
  console.log(dataSet);
});

const renderTable = function () {
  $("#example").DataTable({
    data: dataSet,
    columns: [
      { title: "eventId" },
      { title: "event_title" },
      { title: "event_location" },
      { title: "organizer_name" },
      { title: "event_goal" },
      { title: "startDate" },
      { title: "endDate" },
      { title: "additional_info" },
      { title: "status" },
      { title: "created at" },
      {
        title: "Action",
        mRender: function (data, type, row) {
          // return `<button >${data}</button>`;
          // TODO   fas fa-edit
          return `
        
          <a type="button"
          rel="tooltip"
          title="Delete"
          class="accept btn  btn-link btn-sm"
          title="accept"
          >
            <i class="fa fa-check"></i>
            </a> 
        <a  type="button"
        rel="tooltip"
        title="Delete"
        class="delete btn btn-danger btn-link btn-sm"
        title="Reject">
            <i class="fa fa-times"></i>
                            </a>
                            <a type="button"
                            rel="tooltip"
                            title="Edit"
                            class="edit btn btn-danger btn-link btn-sm"
                            
                             style="color:purple;" title="edit">
                                <i class="fa fa-edit"></i>
                            </a>  `;
        },
      },
    ],
  });
};
