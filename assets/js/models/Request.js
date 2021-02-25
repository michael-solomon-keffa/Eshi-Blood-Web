import { db } from "../database/db.js";

export class Request {
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

  getCreatedAt() {
    const date = new Date(this.createdAt);
    return date.toDateString();
  }

  getDonorsLink() {
    let link = "";
    this.id_donors.forEach((donorId) => {
      link += `<a href="./user-detail.html?id=${this.donorId}" class="btn btn-primary" >ID - ${donorId}</a>`;
    });
    return link;
  }
}
