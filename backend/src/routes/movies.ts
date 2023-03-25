import { Router } from "express";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movies";

const router = Router();

router
  .get("/", getMovies)
  .post("/", createMovie)
  .get("/:id", getMovieById) // new route for getting movie by id
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
