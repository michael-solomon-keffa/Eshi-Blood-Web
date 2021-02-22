import { Donor } from "../models/Donor.js";
import { Appointment } from "../models/Appointment.js";
import { Donation } from "../models/Donation.js";
import { Request } from "../models/Request.js";
import { DonationCenter } from "../models/DonationCenter.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

export const db = new Dexie("eshi_blood_database");
db.version(17).stores({
  donors:
    "++id,name,email,blood_type,city,woreda,phone_number,birthdate,activated,can_donate,points,createdAt,updatedAt,is_deleted",
  appointment:
    "++id,start_date,end_date,time,status,id_donor,id_donation_center,is_event_request,id_event_request,createdAt,updatedAt,is_deleted",
  donation: "++id,date,createdAt,updatedAt,id_donor,id_appointment,is_deleted",
  request:
    "++id,blood_type,units_needed,request_reason,location,add_info,status,createdAt,updatedAt,*id_donors,is_deleted",
  donation_center:
    "++id,center_name,city,woreda,phone_number,add_info,is_open,createdAt,updatedAt,is_deleted",
  event:
    "++id,event_title,event_location,organizer_id,organizer_name,organizer_address,organizer_number,event_goal,start_date,end_date,add_info,status,createdAt,updatedAt,*id_donors,is_deleted",
  users: "++id,email,password,is_admin,id_donor",
});

db.open();

db.donors.mapToClass(Donor);
db.appointment.mapToClass(Appointment);
db.donation.mapToClass(Donation);
db.request.mapToClass(Request);
db.donation_center.mapToClass(DonationCenter);
db.event.mapToClass(Event);
db.users.mapToClass(User);

//

// db.donation.add({
//   date: "Jan 04 2020",
//   createdAt: "Jan 04 2020",
//   updatedAt: "Jan 04 2020",
//   id_donor: "76",
//   id_appointment: "1",
// });

// db.request.add({
//   blood_type: "A+",
//   units_needed: "5",
//   request_reason: "Operation",
//   id_donors: "",
// });

// db.appointment.add({
//   start_date: "Jan 5 2021",
//   end_date: "Jan 23 2021",
//   time: "02:20",
//   status: "pending",
//   createdAt: "Jan 04 2020",
//   updatedAt: "Feb 20 2020",
//   id_donor: "76",
//   status: "pending",
//   is_deleted: "false",
// });
//users: ++id, name, phone_number, email, password, sta isAdmin;
