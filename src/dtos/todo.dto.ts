import Joi from "@hapi/joi";

const validationUserSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  todoStatus: Joi.boolean(),
  _id: Joi.string(),
});

export default validationUserSchema;
