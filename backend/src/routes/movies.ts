import { Router } from "express";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movies";
import upload from "../utils/multer";
import { requireLogin } from "../controllers/auth";

const router = Router();

router.use(requireLogin);

router
  .get("/", getMovies)
  .post("/", upload.single("image"), createMovie)
  .get("/:id", getMovieById)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
