import joi from "joi";

export const cardSchema = joi.object({
  title: joi.string().required(),
  number: joi.string().required(),
  nameOfCardHolder: joi.string().required(),
  securityCode: joi.string().max(3),
  dateExpiration: joi.string().required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().required()
});
