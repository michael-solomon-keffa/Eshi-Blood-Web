import { db } from "../database/db.js";

export function Donor(name, blood_type) {
  this.name = name;
  this.blood_type = blood_type;
}
