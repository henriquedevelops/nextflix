import { Router } from "express";
import { createUser, deleteUser } from "../controllers/users";

const router = Router();

router.post("/", createUser).delete("/:id", deleteUser);

export default router;
