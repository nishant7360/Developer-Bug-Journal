import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import errorHandler from "./middlewares/error.middleware.js";
import AuthRouter from "./routes/auth.routes.js";
import QuestionRouter from "./routes/question.route.js";
import AnswerRouter from "./routes/answer.route.js";
import CommentRouter from "./routes/comment.route.js";
import TagRouter from "./routes/tag.route.js";
import UserRouter from "./routes/user.routes.js";
import NotificationRouter from "./routes/notification.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
-app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/question", QuestionRouter);
app.use("/api/v1/answer", AnswerRouter);
app.use("/api/v1/comment", CommentRouter);
app.use("/api/v1/tags", TagRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/notification", NotificationRouter);

app.use(errorHandler);
export default app;
