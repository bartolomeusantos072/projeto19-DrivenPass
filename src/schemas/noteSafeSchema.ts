import joi from "joi";

export const noteSafeSchema = joi.object({
    title:joi.string().max(50).required,
    note:joi.string().max(1500).required()
})