import moviesRouter from "./routes/movies";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import myListRouter from "./routes/myList";
import globalErrorHandler from "./error-handling/globalErrorHandler";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Please try again later!",
  })
);

const corsOrigin = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  origin && res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("images"));

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/myList", myListRouter);

app.use(globalErrorHandler);

const port = process.env.SERVER_PORT;

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}. 🚀`);
});
