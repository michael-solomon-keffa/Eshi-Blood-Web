import { db } from "../database/db.js";

export class RequestController {
  static getInstance() {}

  save(request) {
    return db.request.add(request);
  }

  async getAllRequests() {
    const requests = await db.request.toArray();
    return requests;
  }

  async getRequest(id) {
    const request = await db.request.get(id);
    return request;
  }
}
