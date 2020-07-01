import { Schema, model } from "mongoose";
import { ITodoDocument } from "../interfaces/ITodoDocument";


const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    text: true 
  },
  description: {
    type: String,
    required: true,
    trim: true,
    text: true 
  },
  date: { type: Date, default: Date.now },
});


export default model<ITodoDocument>("Todo", todoSchema);
