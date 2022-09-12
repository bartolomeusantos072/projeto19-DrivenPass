import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import {cardSchema} from "../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const cardRouter = Router();

cardRouter.post("/card-create",validateSchemaMiddleware(cardSchema),authMiddleware,cardController.insertCard)
cardRouter.get("/cards",authMiddleware, cardController.findAllCards);
cardRouter.get("/cards/:id",authMiddleware, cardController.findCard);
cardRouter.delete("/cards/:id",authMiddleware, cardController.deleteCard)

export default cardRouter