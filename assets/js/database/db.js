import { Donor } from "../models/Donor.js";
import { Appointment } from "../models/Appointment.js";
import { Donation } from "../models/Donation.js";
import { Request } from "../models/Request.js";
import { DonationCenter } from "../models/DonationCenter.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

export const db = new Dexie("eshi_blood_database");
db.version(0.1).stores({
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

db.donors.mapToClass(Donor);
db.appointment.mapToClass(Appointment);
db.donation.mapToClass(Donation);
db.request.mapToClass(Request);
db.donation_center.mapToClass(DonationCenter);
db.event.mapToClass(Event);
db.users.mapToClass(User);

db.on("populate", function () {
  db.donors.add({
    name: "Abenezer Atnafu",
    email: "abenealayud@gmail.com",
    blood_type: "A+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/2000",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Abrham Tesfayee",
    email: "abrham@gmail.com",
    blood_type: "A-",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/1999",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Michael Solomon",
    email: "michael@gmail.com",
    blood_type: "AB+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/1895",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Semere Talgngetas",
    email: "semere@gmail.com",
    blood_type: "O+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/1998",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Mintesnot Bezabh",
    email: "mentesnot@gmail.com",
    blood_type: "A+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/2001",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Rediet Mengiste",
    email: "aynadis@gmail.com",
    blood_type: "A+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/1980",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donors.add({
    name: "Betselot Getnet",
    email: "betsiga@gmail.com",
    blood_type: "A+",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "0946414257",
    birthdate: "29/05/2000",
    activated: true,
    can_donate: true,
    points: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });

  db.users.add({
    email: "abenealayud@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: true,
    id_donor: 1,
  });
  db.users.add({
    email: "abrham@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 2,
  });
  db.users.add({
    email: "michael@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 3,
  });
  db.users.add({
    email: "semere@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 4,
  });
  db.users.add({
    email: "mentesnot@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 5,
  });
  db.users.add({
    email: "aynadis@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 6,
  });
  db.users.add({
    email: "betsiga@gmail.com",
    password: "U2FsdGVkX19lO8hbIA7FcY6G/icuts4moE//7q5OFOw=",
    is_admin: false,
    id_donor: 7,
  });

  // donor 2
  db.appointment.add({
    start_date: "2/11/2021 04:00 PM",
    end_date: "3/24/2021 12:00 AM",
    time: "04:00",
    status: "pending",
    id_donor: 2,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.appointment.add({
    start_date: "10/11/2020 04:00 PM",
    end_date: "10/24/2020 12:00 AM",
    time: "04:00",
    status: "success",
    id_donor: 2,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation.add({
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id_donor: 2,
    id_appointment: 2,
    is_deleted: false,
  });
  db.appointment.add({
    start_date: "5/11/2020 04:00 PM",
    end_date: "5/24/2020 12:00 AM",
    time: "04:00",
    status: "success",
    id_donor: 2,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation.add({
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id_donor: 2,
    id_appointment: 3,
    is_deleted: false,
  });

  //donor 3
  db.appointment.add({
    start_date: "2/11/2021 04:00 PM",
    end_date: "3/24/2021 12:00 AM",
    time: "04:00",
    status: "pending",
    id_donor: 3,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.appointment.add({
    start_date: "10/11/2020 04:00 PM",
    end_date: "10/24/2020 12:00 AM",
    time: "04:00",
    status: "success",
    id_donor: 3,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation.add({
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id_donor: 2,
    id_appointment: 4,
    is_deleted: false,
  });
  db.appointment.add({
    start_date: "5/11/2020 04:00 PM",
    end_date: "5/24/2020 12:00 AM",
    time: "04:00",
    status: "success",
    id_donor: 3,
    id_donation_center: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation.add({
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id_donor: 2,
    id_appointment: 5,
    is_deleted: false,
  });

  // donation center
  db.donation_center.add({
    center_name: "Addis Ababa",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "09123456789",
    add_info: "",
    is_open: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation_center.add({
    center_name: "Addis Ababa",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "09123456789",
    add_info: "",
    is_open: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation_center.add({
    center_name: "Addis Ababa",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "09123456789",
    add_info: "",
    is_open: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
  db.donation_center.add({
    center_name: "Addis Ababa",
    city: "Addis Ababa",
    woreda: "09",
    phone_number: "09123456789",
    add_info: "",
    is_open: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: false,
  });
});

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
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   id_donor: "76",
//   status: "pending",
//   is_deleted: false,
// });
//users: ++id, name, phone_number, email, password, sta isAdmin;
