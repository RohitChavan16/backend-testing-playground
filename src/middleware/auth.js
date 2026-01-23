function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = { id: 1 };

  next();
}

module.exports = {
  auth
};
