import { db } from "../database/db.js";

export class AppointmentController {
  save(apt) {
    return db.appointment.add({
      ...apt,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      is_deleted: false,
    });
  }

  async getAllAppointments() {
    const appointments = await db.appointment
      .filter((apt) => {
        return apt.is_deleted == false;
      })
      .toArray();
    return appointments;
  }

  async getAptCardData() {
    const totalApts = await db.appointment
      .filter((apt) => {
        return apt.is_deleted == false;
      })
      .count();
    const totalActiveApts = await db.appointment
      .filter((apt) => {
        return apt.status == "pending";
      })
      .count();

    const aptsInThisMonth = await db.appointment
      .filter((apt) => {
        const endDate = new Date(apt.end_date);
        const startDate = new Date(apt.start_date);
        const currentDate = new Date();
        console.log(
          currentDate.getTime() > startDate.getTime() &&
            currentDate.getTime() < endDate.getTime()
        );
        if (endDate.getMonth() - 1 == currentDate.getMonth()) {
          return apt;
        }
      })
      .count();

    const successApts = await db.appointment
      .filter((apt) => {
        return apt.status == "success";
      })
      .count();

    return {
      totalApts,
      totalActiveApts,
      aptsInThisMonth,
      successApts,
    };
  }

  async getApt(id) {
    const apt = await db.appointment.get(id);
    return apt;
  }

  async updateStatus(id, status) {
    console.log(id, status);
    const update = await db.appointment.update(parseInt(id), {
      status: status,
    });
    return update;
  }

  async deleteAppointment(id) {
    console.log(id);
    const deleted = await db.appointment.update(parseInt(id), {
      is_deleted: true,
      status: "in-active",
    });
    return deleted;
  }
}
