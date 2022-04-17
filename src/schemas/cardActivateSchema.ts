import joi from "joi";

const cardActivateSchema = joi.object({
  cvv: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
});

export default cardActivateSchema;
