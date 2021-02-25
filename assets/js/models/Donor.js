import { db } from "../database/db.js";

export class Donor {
  getAge() {
    const year = Date.now() - new Date(this.birthdate);
    return new Date(year).getFullYear() - 1970;
  }

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
}
