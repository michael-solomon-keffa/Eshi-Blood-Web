import { db } from "../database/db.js";

export class DonorController {
  static getInstance() {
    //return new Donor();
  }

  // adding to db
  save(donor) {
    return db.donors.add(donor);
  }

  // stastical functions
  async getAdminDonorPageStat() {
    const totalDonorsCount = await db.donors.count();
    const totalEligibleDonorsCount = await db.donors
      .where("can_donate")
      .equalsIgnoreCase("true")
      .count();

    const totalRareBloodTypeDonorCount = await db.donors
      .where("blood_type")
      .equalsIgnoreCase("O")
      .count();

    const totalDonorsInAACount = await db.donors
      .where("city")
      .equalsIgnoreCase("addis ababa")
      .count();

    return {
      totalDonorsCount,
      totalEligibleDonorsCount,
      totalRareBloodTypeDonorCount,
      totalDonorsInAACount,
    };
  }

  /**
   * @param {integer} page
   * @param {integer} limit
   * @returns {Donors}
   */
  async getAllDonors(page, limit = 10) {
    page = page * 1 || 1;
    const offset = (page - 1) * limit;

    const donors = await db.donors
      .offset(offset)
      .limit(limit)
      .filter((donor) => {
        return donor.is_deleted == false;
      })
      .toArray();

    await Promise.all(
      donors.map(async (donor) => {
        [donor.donations, donor.appointments] = await Promise.all([
          db.donation.where("id_donor").anyOf(donor.id.toString()).toArray(),
          db.appointment.where("id_donor").anyOf(donor.id.toString()).toArray(),
        ]);
      })
    );
    return { donors, page };
  }
  /**
   * @param {integer} id
   * @returns {Donor} Donor
   */
  async getDonor(id) {
    const donors = [await db.donors.get(id)];
    await Promise.all(
      donors.map(async (donor) => {
        [donor.donations, donor.appointments] = await Promise.all([
          db.donation.where("id_donor").anyOf(donor.id.toString()).toArray(),
          db.appointment.where("id_donor").anyOf(donor.id.toString()).toArray(),
        ]);
      })
    );

    return donors;
  }
  /**
   * @param {string} name
   * @returns {Donor[]} Donor
   */
  async getDonorsByName(name) {
    const donor = await db.donors
      .where("name")
      .equalsIgnoreCase(name.toString())
      .toArray();
    return donor;
  }

  async getDonorTry(page = 1, limit = 10) {
    page = page * 1 || 1;
    const offset = (page - 1) * limit;
    const donors = await db.donors.offset(offset).limit(limit).toArray();

    await Promise.all(
      donors.map(async (donor) => {
        [donor.donations, donor.appointments] = await Promise.all([
          db.donation.where("id_donor").anyOf(donor.id.toString()).toArray(),
          db.appointment.where("id_donor").anyOf(donor.id.toString()).toArray(),
        ]);
      })
    );
    return { donors, page };
  }

  async deleteDonor(id) {
    const update = await db.donors
      .update(id, { is_deleted: "true", updatedAt: new Date() })
      .then((update) => {
        return update;
      });

    return update;
  }

  async updateDonor(id, donor) {
    await db.donor.update(id, { donor }).then((update) => {
      return update;
    });
  }

  async activateUser(id) {
    const update = await db.donors
      .update(id, { activated: "true", updatedAt: new Date() })
      .then((update) => {
        return update;
      });
    return update;
  }
}
