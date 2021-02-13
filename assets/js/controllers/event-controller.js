import { db } from "../database/db.js";

export class EventController {
  async getAllEvents() {
    const events = db.event.toArray();
    return events;
  }

  async getEvent(id) {
    const event = db.event.get(id);
  }
}
