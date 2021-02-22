import { RequestController } from "../controllers/request-controller.js";

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
