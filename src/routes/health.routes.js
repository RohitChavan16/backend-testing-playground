import express from "express"

const healthRouter = express.Router();

healthRouter.get("/checkHealth", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

export default healthRouter;
