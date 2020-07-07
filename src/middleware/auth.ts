import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { IUserDocument } from '../interfaces/IUserDocument';
import { Token } from "../interfaces/token.model";

declare global {
    namespace Express {
      interface Request {
        user: IUserDocument,    
      }
    }
  }

const auth: RequestHandler = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) {
      throw new Error();
    }

    const token = header.replace("Bearer ", "");

    const decoded = jwt.verify(token, "expressapp") as Token;
    
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    } 
    
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please autentificate" });
  }
};

export default auth;
