import { Schema, model } from "mongoose";
import { IEveryTodoDocument } from "../interfaces/IEveryTodoDocument";


const todoSchema = new Schema({
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
  todoType: {
    type: String,
    required: true,
    trim: true
  },
  todoChecked: {
    type: Boolean,
    default: false
  },
  date: { type: Number, default:-1},
},
{ versionKey: false });

export default model<IEveryTodoDocument>("EveryTodo", todoSchema);
