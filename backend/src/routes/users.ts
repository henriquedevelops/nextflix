import { Router } from "express";
import { authenticate } from "../auth/jwtToken";
import { createUser, deleteUser } from "../controllers/users";

const router = Router();

router.post("/", createUser).delete("/:id", authenticate, deleteUser);

export default router;
