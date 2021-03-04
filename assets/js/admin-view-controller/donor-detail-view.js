import { DonorController } from "../controllers/donor-controller.js";

const donor = new DonorController();
const urlParams = new URLSearchParams(window.location.search);

const donorViewList = document.getElementById("donors_list_view");
const paginationView = document.getElementById("pagination");
const totalDonorsView = document.getElementById("totalDonorsView");
const totalEligibleView = document.getElementById("eligibleDonorsView");
const rareBloodTypeDonors = document.getElementById("rareDonorsView");
const totalDonorsInAAView = document.getElementById("totalDonorsInAA");
let next = "";
let prev = "";
let element;
let page;

// starting from page number 1
if (Number(urlParams.get("page"))) {
  page = Number(urlParams.get("page"));
} else {
  page = 1;
}
const logout = function () {
  Cookies.remove("_emeshi");
  Cookies.remove("_adeshi");
  window.location.replace("https://michael-pi-max.github.io/Eshi-Blood-Web/");
};
document.getElementById("logout").addEventListener("click", logout);
const populateList = async () => {
  let obj = await donor.getAllDonors(page, 6);
  let donorList = obj.donors;
  console.log(donorList);
  //console.log(donorList);
  if (donorList.length === 0) {
    element = `<h1 class="mt-5">Sorry! No Donors Found!</h1>`;
    const wrapper = document.createElement("div");
    wrapper.className = "mt-5";
    wrapper.innerHTML = element;
    donorViewList.appendChild(wrapper);
  } else {
    donorList.forEach((donor) => {
      console.log(donor.getRegisteredMonth());
      element = `
      <div class="card-wrapper">
        <div class="content">
          <div class="face-front z-depth-2">
          <img
          src="./assets/images/blood-types/${donor.blood_type}.webp"
          class="rounded-circle"
          alt=""
          width="150px"
          height="100px"
        />
            <div class="card-body">
              <h4 class="font-weight-bold">${donor.name}</h4>
              <hr />
              <div class="row">
                <div class="col-md-6">
                  <div class="btn btn-primary">${donor.blood_type}</div>
                </div>
                <div class="col-md-6">
                  <div class="btn btn-primary">${donor.city}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="face-back z-depth-2">
            <div class="card-body">
              <h4 class="font-weight-bold">Donor Status</h4>
              <hr />
              <p>Total Donations &nbsp; ${donor.donations.length}</p>
              <p>Total Appointments &nbsp; ${donor.appointments.length}</p>
              <p>Birth Date &nbsp; ${donor.birthdate}</p>
              <p>Woreda &nbsp; ${donor.woreda}</p>
              <p>Phone number &nbsp; ${donor.phone_number}</p>
              <p>Created at &nbsp; ${new Date(
                donor.createdAt
              ).toDateString()}</p>
              <p>Activated &nbsp; ${donor.activated}</p>
              <a  type"button" href="/user-detail.html?id=${
                donor.id
              }" class="btn btn-danger ml-1">
                View Detail
              </a>
            </div>
          </div>
        </div>
      </div>
      `;

      const wrapper = document.createElement("div");
      wrapper.className = "col-lg-4 col-md-6 col-sm-12 mt-2";
      wrapper.innerHTML = element;
      donorViewList.append(wrapper);
    });
  }

  if (page > 1) {
    prev = `<a href="/user.html?page=${
      page - 1
    }" class="btn btn-secondary mr-3 mb-5"> Prev </a>`;
  }
  if (donorList.length === 6) {
    next = `<a href="/user.html?page=${
      page + 1
    }" class="btn btn-primary mb-5">Next</a>`;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = prev + next;
  paginationView.appendChild(wrapper);
};

const populateCard = async () => {
  let obj = await donor.getAdminDonorPageStat();
  totalDonorsView.innerText = obj.totalDonorsCount;
  totalEligibleView.innerText = obj.totalEligibleDonorsCount;
  rareBloodTypeDonors.innerText = obj.totalRareBloodTypeDonorCount;
  totalDonorsInAAView.innerText = obj.totalDonorsInAACount;
};

const trying = async () => {
  let obj = await donor.getDonorTry();
  //console.log(obj.donors);
};

//console.log(page);
trying();
populateList();
populateCard();
