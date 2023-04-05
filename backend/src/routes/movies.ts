import { Router } from "express";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movies";
import upload from "../utils/multer";
import { requireLogin, restricToAdmin } from "../controllers/auth";

const router = Router();

router.use(requireLogin);

router.get("/", getMovies).get("/:id", getMovieById);

router.use(restricToAdmin);

router
  .post("/", upload.single("image"), createMovie)
  .patch("/:id", updateMovie)
  .delete("/:id", deleteMovie);

export default router;
