import { Router } from "express";

import { createNoteSafe, deleteNoteSafe, findNoteSafe, findAllNoteSafes } from "../controllers/noteSafeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { noteSafeSchema } from "../schemas/noteSafeSchema";


const noteSafeRouter = Router();


noteSafeRouter.use(authMiddleware);
noteSafeRouter.get("/notesafe", findAllNoteSafes);
noteSafeRouter.post("/notesafe", validateSchemaMiddleware(noteSafeSchema), createNoteSafe);
noteSafeRouter.get("/notesafe/:id", findNoteSafe)
noteSafeRouter.delete("/notesafe/:id", deleteNoteSafe);

export default noteSafeRouter;