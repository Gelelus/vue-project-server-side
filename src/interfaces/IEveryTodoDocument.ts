import { Document } from "mongoose";

export interface IEveryTodoDocument extends Document {
  name: string;
  description: string;
  date: Number | Date;
  todoType: string;
  todoChecked: Boolean;
}
