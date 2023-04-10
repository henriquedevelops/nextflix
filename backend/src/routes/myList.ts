import { Router } from "express";
import {
  getMyList,
  addToMyList,
  deleteFromMyList,
  getMyListIds,
} from "../controllers/myList";
import { requireLogin } from "../controllers/auth";

const router = Router();

router.use(requireLogin);

router
  .get("/", getMyList)
  .get("/id", getMyListIds)
  .post("/", addToMyList)
  .delete("/:movieId", deleteFromMyList);

export default router;
