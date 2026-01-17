import express from "express";
import { users } from "../db/fakeDB.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/users", auth, (req, res) => {
  const { name, email } = req.body;

  // validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  // unique email check
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const user = { id: users.length + 1, name, email };
  users.push(user);

  res.status(201).json(user);
});

export default userRouter;
