import express, { Request, Response } from "express";
import moviesRouter from "./routes/movies";

const app = express();

app.use(express.json());
app.use("/movies", moviesRouter);

app.listen(80, async () => {
  console.log("Server is running 🚀");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Choose an endpoint: /movies /users");
});
