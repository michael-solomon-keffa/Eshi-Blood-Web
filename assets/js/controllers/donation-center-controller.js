import { db } from "../database/db.js";

export class DonationCenterController {
  save(data) {
    return db.donation_center.add(data);
  }
}
