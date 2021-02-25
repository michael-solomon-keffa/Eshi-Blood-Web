import { db } from "../database/db.js";

export class RequestController {
  static getInstance() {}

  addDays(date, days) {
    let copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  save(request) {
    return db.request.add({
      ...request,
      id_donors: [],
      status: "active",
      is_deleted: false,
    });
  }

  async getAdminRequestPageStat() {
    const totalRequestsCount = await db.request.count();
    const totalActiveRequestCount = await db.request
      .filter((req) => {
        return req.status == "active";
      })
      .count();
    let totalBloodKits = 0;
    const count = await db.request.each((req) => {
      totalBloodKits += parseInt(req.units_needed);
    });
    let needed = 0;
    let get = 0;
    const aimAchieved = await db.request.each((req) => {});

    return {
      totalRequestsCount,
      totalActiveRequestCount,
      totalBloodKits,
      aimAchieved,
    };
  }

  async registerRequest(id_donor, id_request) {
    const request = await db.request.get(id_request);
    console.log(request);
    if (request.id_donors.includes(id_donor)) {
      return false;
    } else {
      await db.request.update(id_request, {
        id_donors: [...request.id_donors, id_donor],
      });

      await db.appointment.add({
        start_date: new Date(request.createdAt),
        end_date: new Date(this.addDays(request.createdAt, 14)),
        time: "",
        status: "active",
        id_donors: id_donor,
        id_donation_center: request.location,
        is_event_request: "request",
        id_event_request: id_request,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: false,
      });
      return true;
    }
  }

  async getRequestByBloodType(bloodType) {
    const donationRule = {
      "A+": ["A+", "AB+"],
      "A-": ["A-", "A+", "AB-", "AB+"],
      "B+": ["B+", "AB+"],
      "B-": ["B-", "B+", "AB-", "AB+"],
      "AB+": ["AB+"],
      "AB-": ["AB-", "AB+"],
      "O+": ["A+", "B+", "O+", "AB+"],
      "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    };
    const requests = await db.request
      .filter((req) => {
        return donationRule[bloodType].includes(req.blood_type);
      })
      .sortBy("createdAt");

    return requests;
  }

  async getAllRequests() {
    const requests = await db.request
      .filter((req) => {
        return req.is_deleted == false;
      })
      .toArray();
    return requests;
  }

  async getRequest(id) {
    const request = await db.request.get(id);
    return request;
  }

  async updateRequest(id, request) {
    const update = await db.request.update(id, { request }).then((update) => {
      return update;
    });

    return update;
  }

  async deleteRequest(id) {
    const update = await db.request
      .update(id, { is_deleted: "true", updatedAt: new Date() })
      .then((update) => {
        return update;
      });
    return update;
  }
}
