import express from "express";
import healthRouter from "./routes/health.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());


app.use("/health", healthRouter);
app.use("/user", userRouter);

app.use("/", (req, res) => {
   res.status(200).json({message: "Jai Shri Ram"});
});

export default app;
