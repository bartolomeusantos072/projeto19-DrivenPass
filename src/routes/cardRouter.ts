import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import {cardSchema} from "../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const cardRouter = Router();
cardRouter.use(authMiddleware);
cardRouter.get("/cards", cardController.findAllCards);
cardRouter.post("/cards",validateSchemaMiddleware(cardSchema),cardController.insertCard)
cardRouter.get("/cards/:id",cardController.findCard);
cardRouter.delete("/cards/:id",cardController.deleteCard)

export default cardRouter