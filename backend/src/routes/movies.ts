import { Router } from "express";
import {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies";

const router = Router();

router
  .get("/", getAllMovies)
  .post("/", createMovie)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
