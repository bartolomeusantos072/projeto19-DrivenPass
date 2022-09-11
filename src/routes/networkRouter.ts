import { Router } from "express";

import { createNetwork, deleteNetwork, findNetwork, findAllNetworks } from "../controllers/networkController";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { networkSchema } from "../schemas/networkSchema";


const networkRouter = Router();


networkRouter.use(authMiddleware);
networkRouter.get("/network", findAllNetworks);
networkRouter.post("/network", validateSchemaMiddleware(networkSchema), createNetwork);
networkRouter.get("/network/:id", findNetwork)
networkRouter.delete("/network/:id", deleteNetwork);

export default networkRouter;