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

  hasActiveAppointment() {
    if (this.can_donate) {
      this.appointments.forEach((apt) => {
        if (apt.status == "active" || apt.status == "pending") {
          return true;
        }
      });
      return false;
    } else {
      return true;
    }
  }
}
