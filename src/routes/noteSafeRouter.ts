import { Router } from "express";

import { createNoteSafe, deleteNoteSafe, findNoteSafe, findAllNoteSafes } from "../controllers/noteSafeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { noteSafeSchema } from "../schemas/noteSafeSchema";


const noteSafeRouter = Router();


noteSafeRouter.use(authMiddleware);
noteSafeRouter.get("/NoteSafe", findAllNoteSafes);
noteSafeRouter.post("/NoteSafe", validateSchemaMiddleware(noteSafeSchema), createNoteSafe);
noteSafeRouter.get("/NoteSafe/:id", findNoteSafe)
noteSafeRouter.delete("/NoteSafe/:id", deleteNoteSafe);

export default noteSafeRouter;