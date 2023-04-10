import { Router } from "express";
import {
  getMyList,
  addToMyList,
  deleteFromMyList,
} from "../controllers/myList";
import { requireLogin } from "../controllers/auth";

const router = Router();

router.use(requireLogin);

router
  .get("/", getMyList)
  .post("/:movieId", addToMyList)
  .delete("/:movieId", deleteFromMyList);

export default router;
