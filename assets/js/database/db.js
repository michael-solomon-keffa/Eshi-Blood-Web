import { Donor } from "../models/Donor.js";
import { Appointment } from "../models/Appointment.js";
import { Donation } from "../models/Donation.js";
import { Request } from "../models/Request.js";
import { DonationCenter } from "../models/DonationCenter.js";
import { Event } from "../models/Event.js";

export const db = new Dexie("eshi_blood_database");
db.version(1).stores({
  donors:
    "++id,name,blood_type,city,woreda,phone_number,birthdate,password,activated,can_donate,points,createdAt,updatedAt",
  appointment:
    "++id,start_date,end_date,time,status,createdAt,updatedAt,id_donor,id_donation_center,id_req,id_event",
  donation: "++id,date,createdAt,updatedAt,id_donor,id_appointment",
  request:
    "++id,blood_type,units_needed,request_reason,location,add_info,status,createdAt,updatedAt,*id_donors",
  donation_center:
    "++id,center_name,city,woreda,phone_number,add_info,is_open,createdAt,updatedAt",
  event:
    "++id,location,organizer_name,organizer_address,organizer_phone,event_goal,start_date,end_date,add_info,status,createdAt,updatedAt,*id_donors",
});

db.open();

db.donors.mapToClass(Donor);
db.appointment.mapToClass(Appointment);
db.donation.mapToClass(Donation);
db.request.mapToClass(Request);
db.donation_center.mapToClass(DonationCenter);
db.event.mapToClass(Event);

// db.donors.add({
//   name: "Michael Solomon",
//   blood_type: "A+",
//   city: "Addis Ababa",
//   woreda: "04",
//   phone_number: "0946415555",
//   birthdate: "Jan 04 2020",
//   password: "bchsessssaer",
//   activated: "false",
//   points: "0",
//   createdAt: "Jan 04 2020",
//   updatedAt: "Jan 04 2020",
// });

// db.donation.add({
//   date: "Jan 04 2020",
//   createdAt: "Jan 04 2020",
//   updatedAt: "Jan 04 2020",
//   id_donor: "1",
//   id_appointment: "1",
// });

// db.appointment.add({
//   start_date: "Jan 04 2020",
//   end_date: "Jan 04 2020",
//   time: "02:20",
//   status: "pending",
//   createdAt: "Jan 04 2020",
//   updatedAt: "Jan 04 2020",
//   id_donor: "1",
// });
//users: ++id, name, email, password, isAdmin;
