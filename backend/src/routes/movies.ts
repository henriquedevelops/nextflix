import { Router } from "express";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies";

const router = Router();

router
  .get("/", getMovies)
  .post("/", createMovie)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
