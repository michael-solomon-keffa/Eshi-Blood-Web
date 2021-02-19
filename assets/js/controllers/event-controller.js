import { db } from "../database/db.js";

export class EventController {
  save(event) {
    return db.event.add(event);
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
    await db.event.update(id, { is_deleted: "true" }).then((update) => {
      console.log(update);
    });
  }

  
}
