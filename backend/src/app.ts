import express, { Request, Response } from "express";

const app = express();

app.listen(80, async () => {
  console.log("Server is running 🚀");
});

app.get("/", (req: Request, res: Response) => {
  req.body;
  res.sendFile("eai suavissimo tudo certo", { root: "" });
});
