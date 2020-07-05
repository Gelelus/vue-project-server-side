import Joi from "@hapi/joi";

const validationUserSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,}$")).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  name: Joi.string().alphanum().min(3),
});

export default validationUserSchema;
