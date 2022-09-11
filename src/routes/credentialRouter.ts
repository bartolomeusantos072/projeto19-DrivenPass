import { Router } from "express";

import { createCredential, deleteCredential, findCredential, findAllCredentials } from "../controllers/credentialController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";


const credentialRouter = Router();


credentialRouter.use(authMiddleware);
credentialRouter.get("/credentials", findAllCredentials);
credentialRouter.post("/credentials", validateSchemaMiddleware(credentialSchema), createCredential);
credentialRouter.get("/credentials/:id", findCredential)
credentialRouter.delete("/credentials/:id", deleteCredential);

export default credentialRouter;