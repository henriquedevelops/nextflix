import { Router } from "express";
import { createUser, deleteUser } from "../controllers/users";
import { requireLogin, login } from "../controllers/auth";

const router = Router();

router.post("/", createUser).delete("/:id", requireLogin, deleteUser);

export default router;
