import Joi from "@hapi/joi";

const validationUserSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  description: Joi.string().alphanum().min(2).required(),
});

export default validationUserSchema;
