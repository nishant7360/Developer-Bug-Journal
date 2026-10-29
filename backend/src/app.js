import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import { errorHandler } from "./middlewares/error.middleware.js";
import AuthRouter from "./routes/auth.routes.js";
import QuestionRouter from "./routes/question.route.js";
import AnswerRouter from "./routes/answer.route.js";
import CommentRouter from "./routes/comment.route.js";
import TagRouter from "./routes/tag.route.js";
import UserRouter from "./routes/user.routes.js";
import NotificationRouter from "./routes/notification.route.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

const publicPath = path.resolve(process.cwd(), "public");
app.use(express.static(publicPath));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is ready",
  });
});

app.use("/api", apiLimiter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/question", QuestionRouter);
app.use("/api/v1/answer", AnswerRouter);
app.use("/api/v1/comment", CommentRouter);
app.use("/api/v1/tags", TagRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/notification", NotificationRouter);

app.use(errorHandler);
export default app;
