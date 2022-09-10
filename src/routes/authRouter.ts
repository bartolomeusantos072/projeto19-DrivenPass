import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import {userSchema} from "../schemas/userSchema";
import {signIn,signUp} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(userSchema),signUp);
authRouter.post("/sign-in",validateSchemaMiddleware(userSchema),signIn);

export default authRouter