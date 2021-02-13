import { db } from "../database/db.js";

export class Donor {
  save(data){
    return db.donors.add(data);
  }
}
