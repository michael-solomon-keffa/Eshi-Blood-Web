import { db } from "../database/db.js";

export class Appointment {
  getRegisteredMonth() {
    const month = new Date(this.createdAt).getMonth();
    const months = [
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
    ];
    return month;
  }

  getDonorLink() {
    const link = `<a href="./user-detail.html?id=${this.id_donor}" class="btn btn-primary" >Donor Detail</a>`;
    return link;
  }

  getDonationCenterLink() {
    const link = `<a href="./user.html?id=${this.id_donor}" class="btn btn-primary"> Center Detail</a>`;
    return link;
  }
}
