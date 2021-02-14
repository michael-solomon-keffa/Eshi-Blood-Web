import { db } from "../database/db.js";

export class EventController {
  save(event) {
    db.event.add(event);
  }

  async getAllEvents() {
    const events = db.event.toArray();
    return events;
  }

  async getEvent(id) {
    const event = db.event.get(id);
  }

  // async registerEvent(donorId, eventId){
  //   return db.event.put()
  // }
}
