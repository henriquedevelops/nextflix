import { Router } from "express";
import { authenticate } from "../auth/jwtToken";
import { createUser, deleteUser, login } from "../controllers/users";

const router = Router();

router.post("/auth", login);
router.post("/", createUser).delete("/:id", authenticate, deleteUser);

export default router;
