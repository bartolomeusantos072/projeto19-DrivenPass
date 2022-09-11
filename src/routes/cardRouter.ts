import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import {cardSchema} from "../schemas/cardSchema";
import * as cardController from "../controllers/cardController";

const cardRouter = Router();

cardRouter.get("/cards", cardController.purchaseAllCards);
cardRouter.post("/cards",validateSchemaMiddleware(cardSchema),cardController.insertCard)
cardRouter.get("/cards/:id",cardController.purchaseCard);
cardRouter.delete("/cards/:id",cardController.deleteCard)

export default cardRouter