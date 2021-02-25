import { DashboardController } from "../controllers/dashboard-controller.js";
import { DonorController } from "../controllers/donor-controller.js";
import { crypt } from "../utils/crypt.js";

const dashboardController = new DashboardController();

// checking whether signed in or not
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

const totalDonorsView = document.getElementById("totalDonorsView");
const totalActiveDonorsView = document.getElementById("totalActiveDonorsView");
const totalAppointmentsView = document.getElementById("totalAppointmentsView");
const totalRequestsView = document.getElementById("totalRequestsView");
const totalDonationCentersView = document.getElementById(
  "totalDonationCentersView"
);

const populateList = async () => {
  const dashboardData = await dashboardController.getDashboardData();

  totalActiveDonorsView.innerText = dashboardData.totalActiveDonorsCount;
  totalAppointmentsView.innerText = dashboardData.totalAppointments;
  totalDonationCentersView.innerText = dashboardData.totalDonationCenters;
  totalDonorsView.innerText = dashboardData.totalDonors;
  totalRequestsView.innerText = dashboardData.totalRequests;
};

populateList();

const loadChart = async () => {
  var ctx = document.getElementById("myChart").getContext("2d");
  const donorData = await dashboardController.getDonorChartData();
  const appointmentData = await dashboardController.getAptChartData();
  const requestData = await dashboardController.getRequestChartData();
  console.log(donorData);
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      datasets: [
        {
          label: "Registered Donors",
          borderColor: "rgb(255, 99, 132)",
          data: donorData,
        },
        {
          label: "Appointments",
          borderColor: "rgba(151,187,205,1)",
          data: appointmentData,
        },
        {
          label: "Requests",
          borderColor: "rgba(130,55,205,1)",
          data: requestData,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

loadChart();
