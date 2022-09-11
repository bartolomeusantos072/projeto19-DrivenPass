import { Router } from "express";
import authRouter from "./authRouter";
import cardRouter from "./cardRouter";
import credentialRouter from "./credentialRouter";
import networkRouter from "./networkRouter";
import noteSafeRouter from "./noteSafeRouter";

const router= Router();

router.use(authRouter);
router.use(cardRouter);
router.use(credentialRouter);
router.use(networkRouter);
router.use(noteSafeRouter);


export default router;
