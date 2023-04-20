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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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
