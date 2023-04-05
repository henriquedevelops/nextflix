import { Router } from "express";
import { createUser, deleteUser } from "../controllers/users";
import { requireLogin, login, logout } from "../controllers/auth";

const router = Router();

router.post("/", login).delete("/", logout);

export default router;
