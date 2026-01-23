const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const { errorHandler } = require("./middleware/error.middleware.js");
const userRouter = require("./routes/user.routes.js");
const healthRouter = require("./routes/health.routes.js");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/health", healthRouter);
app.use(errorHandler);

module.exports = app;
