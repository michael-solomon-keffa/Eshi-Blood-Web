import { db } from "../database/db.js";

export class EventController {
  save(event) {
    return db.event.add({
      ...event,
      status: "active",
      createdAt: new Date(),
      updateAt: new Date(),
      id_donors: [],
      is_deleted: false,
    });
  }

  async getEventCardData() {
    const totalEvents = await db.event
      .filter((eve) => {
        return eve.is_deleted == false;
      })
      .count();

    const totalActiveEvents = await db.event
      .filter((eve) => {
        return eve.status == "active";
      })
      .count();

    const eventsInThisMonth = await db.event
      .filter((eve) => {
        const endDate = new Date(eve.end_date);
        const startDate = new Date(eve.start_date);
        const currentDate = new Date();
        console.log(
          currentDate.getTime() > startDate.getTime() &&
            currentDate.getTime() < endDate.getTime()
        );
        if (endDate.getMonth() == currentDate.getMonth()) {
          return eve;
        }
      })
      .count();

    const totalSuccessEvents = await db.event
      .filter((eve) => {
        return eve.status == "success";
      })
      .count();

    return {
      totalEvents,
      totalActiveEvents,
      eventsInThisMonth,
      totalSuccessEvents,
    };
  }

  async getAllEventsId() {
    const idList = [];
    const event = await db.event.each((_event) => {
      idList.push(_event.id.toString());
    });
    return idList;
  }

  async getAllEvents() {
    const events = await db.event
      .filter((event) => {
        return event.is_deleted == false;
      })
      .toArray();
    return events;
  }

  async getEvent(id) {
    const event = await db.event.get(id);
    return event;
  }

  async deleteEvent(id) {
    await db.event.update(id, { is_deleted: true }).then((update) => {
      console.log(update);
    });
  }

  async registerUserToEvent(id_donor, id_event) {
    const event = await db.event.get(id_event);

    if (event.id_donors.includes(id_donor)) {
      return false;
    } else {
      await db.event.update(id_event, {
        id_donors: [...event.id_donors, id_donor],
      });

      await db.appointment.add({
        start_date: new Date(event.createdAt),
        end_date: new Date(event.end_date),
        time: "",
        status: "pending",
        id_donors: id_donor,
        id_donation_center: event.event_location,
        is_event_request: "event",
        id_event_request: id_event,
        createdAt: new Date(),
        updateAt: new Date(),
        is_deleted: false,
      });
    }

    return true;
  }
}
