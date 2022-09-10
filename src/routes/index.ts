import { Router } from "express";
import authRouter from "./authRouter";
import cardRouter from "./cardRouter";

const router= Router();

router.use(authRouter);
router.use(cardRouter)

export default router;
