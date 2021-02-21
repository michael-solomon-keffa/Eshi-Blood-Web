import { RequestController } from "../controllers/request-controller.js";

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

const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace("http://127.0.0.1:5502/index.html");
};
document.getElementById("logout").addEventListener("click", logout);

const requestController = new RequestController();

const totalRequestView = document.getElementById("totalRequests");
const totalActiveRequestsView = document.getElementById("activeRequests");
const totalBloodKitsView = document.getElementById("totalBloodKits");

const populateCard = function () {
  requestController.getAdminRequestPageStat().then((obj) => {
    totalActiveRequestsView.innerText = obj.totalActiveRequestCount;
    totalBloodKitsView.innerText = obj.totalBloodKits;
    totalRequestView.innerText = obj.totalRequestsCount;
  });
};

populateCard();
let requestToBChange = 0;

const table = document.getElementById("requestTable");

const getData = (cb) => {
  let data = [];
  requestController.getAllRequests().then((requests) => {
    console.log(requests);
    requests.forEach((request) => {
      let innerData = [];
      innerData.push(request.id);
      innerData.push(request.blood_type);
      innerData.push(request.units_needed);
      innerData.push(request.request_reason);
      innerData.push(request.location);
      innerData.push(request.add_info);
      innerData.push(request.status);
      innerData.push(request.getCreatedAt());
      innerData.push(request.getDonorsLink());
      data.push(innerData);
    });
    renderTable(data);
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        requestToBChange = btn.classList[0];
      });
    });
  });
};

const renderTable = function (data) {
  $("#requestTable").DataTable({
    data: data,
    columns: [
      {
        title: "request id",
      },
      {
        title: "blood type",
      },
      {
        title: "units needed",
      },
      {
        title: "reason",
      },
      {
        title: "location",
      },
      {
        title: "addi. info",
      },
      {
        title: "status",
      },
      {
        title: "created At",
      },
      {
        title: "id donors",
      },
      {
        title: "Action",
        mRender: function (data, type, row) {
          return `
                <button  class="${row[0]} btn btn-success reject" data-toggle="modal" data-target="#successModal"  title="Success">
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

getData();

document.getElementById("success-btn").addEventListener("click", successApt);
document.getElementById("delete-btn").addEventListener("click", deleteApt);

function successApt() {
  const alertView = document.getElementById("accept-alert");
  requestController.updateStatus(requestToBChange, "success").then(() => {
    alertView.firstElementChild.innerText = "Request Successful!";
    alertView.classList.toggle("alert-success");
    alertView.classList.toggle("show");
    setTimeout(window.location.reload(), 2000);
  });
}

function deleteApt() {
  const alertView = document.getElementById("accept-alert");
  requestController.deleteRequest(requestToBChange).then((deleted) => {
    console.log(deleted);
    alertView.firstElementChild.innerText = "Request Deleted";
    alertView.classList.toggle("alert-danger");
    alertView.classList.toggle("show");
    setTimeout(window.location.reload(), 2000);
  });
}
