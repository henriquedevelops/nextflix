import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import globalErrorHandler from "./error-handling/globalErrorHandler";
import authRouter from "./routes/auth";
import moviesRouter from "./routes/movies";
import myListRouter from "./routes/myList";
import usersRouter from "./routes/users";
dotenv.config();

const app = express();

app.use(helmet());
app.use(
  rateLimit({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: "Please try again later!",
  })
);

const corsConfig = {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("images"));

app.get("/health", (_, res: Response) => res.sendStatus(200));
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/myList", myListRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(globalErrorHandler);

const port = process.env.SERVER_PORT;

app.listen(port, async () =>
  console.log(`Server is listening on port ${port}. 🚀`)
);
