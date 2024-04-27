import express from "express";
import "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";
import middleware from "./utils/middleware.js";
import { courseRouter } from "./routes/course.route.js";
import { userRouter } from "./routes/user.route.js";
import { contentRouter } from "./routes/content.route.js";
import config from "./utils/config.js";

const app = express();

const cors_options = {
  origin: config.ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(cors_options));

app.use(express.json());

app.use(middleware.firstMiddleware);

app.use("/api", authRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/content", contentRouter);

app.use(middleware.errorHandlerMiddleware);

export { app };
