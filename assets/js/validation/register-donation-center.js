import { db } from "../database/db.js";
import { DonationCenterController } from "../controllers/donation-center-controller.js";
import { DonationCenter } from "../models/DonationCenter.js";

function isValidDonationCenter() {}

function registerDonationCenter(e) {
  e.preventDefault();
  const data = new FormData(e.target);

  if (true) {
    const response = Object.fromEntries(data.entries());
    const donationCenter = new DonationCenterController();

    donationCenter
      .save({
        ...response,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: false,
      })
      .then(() => {
        console.log("Donation Center added!");
      });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", registerDonationCenter);
