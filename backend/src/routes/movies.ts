import { Router } from "express";
import { getAllMovies } from "../controllers/movies";

const router = Router();

router.get("/", getAllMovies);

export default router;
