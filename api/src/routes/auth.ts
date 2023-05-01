import { Router } from "express";
import { login, logout } from "../controllers/auth";

const router = Router();

router.post("/", login).delete("/", logout);

export default router;
