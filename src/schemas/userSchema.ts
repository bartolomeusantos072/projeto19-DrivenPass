import {CreateUserData} from "../services/userService";
import joi from "joi";

export const userSchema = joi.object<CreateUserData>({
    email:joi.string().email().required(),
    password:joi.string().min(10).required()
});