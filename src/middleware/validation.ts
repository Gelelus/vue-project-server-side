import { RequestHandler } from "express";
import Joi from '@hapi/joi';

export default (schema : Joi.ObjectSchema) : RequestHandler => async (req, res, next) => {
    try {
       await schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        res.status(400).send(err);
    }
};



