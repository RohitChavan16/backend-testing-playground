const express = require("express");

const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "JAI SHRI RAM",
    uptime: process.uptime(),
  });
});

healthRouter.get("/checkHealth", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

module.exports = healthRouter;
