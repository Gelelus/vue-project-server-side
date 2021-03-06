import { Document } from "mongoose";

export interface ITodoDocument extends Document {
  name: string;
  description: string;
  date: Number | Date;
}
