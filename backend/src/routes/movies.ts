import { Router } from "express";
import { getAllMovies, createMovie } from "../controllers/movies";

const router = Router();

router.get("/", getAllMovies).post("/", createMovie);

export default router;
