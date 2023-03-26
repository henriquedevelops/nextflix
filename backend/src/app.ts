import moviesRouter from "./routes/movies";
import usersRouter from "./routes/users";
import globalErrorHandler from "./error-handling/globalErrorHandler";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use(globalErrorHandler);

app.listen(80, async () => {
  console.log("Server is running 🚀");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Choose an endpoint: /movies /users");
});
