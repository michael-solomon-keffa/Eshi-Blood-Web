import { db } from "../database/db.js";

import { crypt } from "../utils/crypt.js";

window.onload = () => {
  checkSession();
  if (checkSession()) {
    document.body.style.removeProperty("display");
  }
};

let email;

function checkSession() {
  console.log("running");
  if (Cookies.get("_emeshi")) {
    email = crypt.decrypt(Cookies.get("_emeshi"));
    if (Cookies.get("is_admin")) {
      window.location.replace(requestedUrl);
    }
    console.log(Cookies.get("_emeshi"));
    return true;
  } else {
    window.location.replace("http://127.0.0.1:5502/index.html");
    return false;
  }
}

export class UserController {
  getInstanse() {
    return this;
  }

  save(user) {
    db.users.add(user);
  }

  async getUser(email) {
    const user = await db.users
      .where("email")
      .equalsIgnoreCase(email)
      .toArray();
    return user[0];
  }

  async doesEmailExist(email) {
    const user = await db.users.where("email").equalsIgnoreCase(email).count();
    return user;
  }

  async getUserById(id) {
    const user = await db.users.get(id);
    return user;
  }
}
