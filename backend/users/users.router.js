import { Router } from "express";
import { signin, signup, getAllUser } from "./users.controller.js";
const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("", getAllUser);

export default router;
