import { Router } from "express";
import { authenticate } from "../auth/jwtToken";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movies";
import upload from "../utils/multer";

const router = Router();

router
  .get("/", getMovies)
  .post("/", upload.single("image"), createMovie)
  .get("/:id", getMovieById)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
