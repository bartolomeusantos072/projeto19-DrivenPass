import { Router } from "express";

import { createCredential, deleteCredential, findCredential, findAllCredentials } from "../controllers/credentialController";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { credentialSchema } from "../schemas/credentialSchema.js";


const credentialRouter = Router();


credentialRouter.use(authMiddleware);
credentialRouter.get("/credentials", findAllCredentials);
credentialRouter.get("/credentials/:id", findCredential)
credentialRouter.post("/credentials", validateSchemaMiddleware(credentialSchema), createCredential);
credentialRouter.delete("/credentials/:id", deleteCredential);

export default credentialRouter;