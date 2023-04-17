import moviesRouter from "./routes/movies";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import myListRouter from "./routes/myList";
import globalErrorHandler from "./error-handling/globalErrorHandler";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
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
app.use("/images", express.static("images"));
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/myList", myListRouter);
app.use(globalErrorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Choose an endpoint: /movies /users");
});

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}. 🚀`);
});
