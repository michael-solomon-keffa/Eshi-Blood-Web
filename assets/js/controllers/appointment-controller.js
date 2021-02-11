import { db } from "../../database/db.js";

export class AppointmentController {
  async getAllAppointments() {
    const appointments = await db.appointment.toArray();
    return appointments;
  }
}
