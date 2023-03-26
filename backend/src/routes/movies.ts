import { Router } from "express";
import { authenticate } from "../auth/jwtToken";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movies";

const router = Router();

router
  .get("/", authenticate, getMovies)
  .post("/", createMovie)
  .get("/:id", getMovieById)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
