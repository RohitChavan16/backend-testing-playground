import { users } from "../db/fakeDB.js";

export function createUser({ email, password }) {
  if (!email || !password) {
    throw new Error("VALIDATION_ERROR");
  }

  if (users.find(u => u.email === email)) {
    throw new Error("DUPLICATE_USER");
  }

  const user = { id: users.length + 1, email, password };
  users.push(user);
  return user;
}

export function findUser(email) {
  return users.find(u => u.email === email);
}
