const { createUser, findUser } = require("../service/user.service.js");

function register(req, res) {
  try {
    const user = createUser(req.body);

    res.status(201).json(user);

  } catch (err) {

    if (err.message === "VALIDATION_ERROR") {
      return res.status(400).json({ error: "Invalid input" });
    }

    if (err.message === "DUPLICATE_USER") {
      return res.status(409).json({ error: "User exists" });
    }

    throw err; // Let global error handler catch it
  }
}

function login(req, res) {
  const user = findUser(req.body.email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ token: "fake-jwt-token" });
}

module.exports = {
  register,
  login
};
