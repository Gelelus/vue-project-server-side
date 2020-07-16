import { Schema, model } from "mongoose";
import { ITodoDocument } from "../interfaces/ITodoDocument";

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: { type: Date, required: true },
  },
  { versionKey: false }
);

export default model<ITodoDocument>("Todo", todoSchema);
