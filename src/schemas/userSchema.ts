import joi from "joi";
import { CreateUserData } from "../utils/typeUtils";

export const userSchema = joi.object<CreateUserData>({
    email:joi.string().email().required(),
    password:joi.string().min(10).required()
});