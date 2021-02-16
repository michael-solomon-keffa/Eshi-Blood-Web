import { db } from "../database/db.js";

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
