import { db } from "../database/db.js";

function getCurrentUser() {}

export class DashboardController {
  async getDashboardData() {
    const totalActiveDonorsCount = await db.donors
      .filter((donor) => {
        return donor.is_deleted == false;
      })
      .count();

    const totalDonors = await db.donors.count();

    const totalAppointments = await db.appointment.count();

    const totalRequests = await db.request.count();

    const totalDonationCenters = await db.donation_center.count();

    return {
      totalActiveDonorsCount,
      totalDonors,
      totalAppointments,
      totalRequests,
      totalDonationCenters,
    };
  }

  async getDonorChartData() {
    const donorList = await db.donors.toArray();
    const jan = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 0;
    }).length;

    const feb = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 1;
    }).length;

    const mar = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 2;
    }).length;

    const apr = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 3;
    }).length;

    const may = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 4;
    }).length;

    const jun = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 5;
    }).length;

    const jul = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 6;
    }).length;

    const aug = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 7;
    }).length;

    const sep = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 8;
    }).length;

    const oct = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 9;
    }).length;

    const nov = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 10;
    }).length;

    const dec = donorList.filter((donor) => {
      return donor.getRegisteredMonth() == 11;
    }).length;

    return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
  }

  async getAptChartData() {
    const aptList = await db.appointment.toArray();
    const jan = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 0;
    }).length;

    const feb = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 1;
    }).length;

    const mar = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 2;
    }).length;

    const apr = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 3;
    }).length;

    const may = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 4;
    }).length;

    const jun = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 5;
    }).length;

    const jul = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 6;
    }).length;

    const aug = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 7;
    }).length;

    const sep = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 8;
    }).length;

    const oct = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 9;
    }).length;

    const nov = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 10;
    }).length;

    const dec = aptList.filter((appointment) => {
      return appointment.getRegisteredMonth() == 11;
    }).length;

    return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
  }

  async getRequestChartData() {
    const requestList = await db.request.toArray();
    const jan = requestList.filter((request) => {
      return request.getRegisteredMonth() == 0;
    }).length;

    const feb = requestList.filter((request) => {
      return request.getRegisteredMonth() == 1;
    }).length;

    const mar = requestList.filter((request) => {
      return request.getRegisteredMonth() == 2;
    }).length;

    const apr = requestList.filter((request) => {
      return request.getRegisteredMonth() == 3;
    }).length;

    const may = requestList.filter((request) => {
      return request.getRegisteredMonth() == 4;
    }).length;

    const jun = requestList.filter((request) => {
      return request.getRegisteredMonth() == 5;
    }).length;

    const jul = requestList.filter((request) => {
      return request.getRegisteredMonth() == 6;
    }).length;

    const aug = requestList.filter((request) => {
      return request.getRegisteredMonth() == 7;
    }).length;

    const sep = requestList.filter((request) => {
      return request.getRegisteredMonth() == 8;
    }).length;

    const oct = requestList.filter((request) => {
      return request.getRegisteredMonth() == 9;
    }).length;

    const nov = requestList.filter((request) => {
      return request.getRegisteredMonth() == 10;
    }).length;

    const dec = requestList.filter((request) => {
      return request.getRegisteredMonth() == 11;
    }).length;

    return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
  }

  show() {}
}
