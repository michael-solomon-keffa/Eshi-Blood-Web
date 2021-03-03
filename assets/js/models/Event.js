import { db } from "../database/db.js";

export class Event {
  isActive() {
    console.log(new Date(this.end_date) > new Date());
    return new Date(this.end_date) > new Date();
  }

  logg() {
    console.log(JSON.stringify(this));
  }

  getDonorsLink() {
    let link = "";
    this.id_donors.forEach((donorId) => {
      link += `<a href="./user-detail.html?id=${donorId}" class="btn btn-primary" >ID - ${donorId}</a>`;
    });
    return link;
  }
}
