import Todo from "../models/todo";

const add = async function (
  data: { name: string; description: string }
) {
  const todo = new Todo(data);
  await todo.save();
  
  return {ok:"all ok"};
};

const get = async function (id: string) {
  return await Todo.findById(id);
};

const getAll = async function () {
  return await Todo.find();
};

const update = async function (
  data: { name: string; description: string ; _id: string }
) {

  return await Todo.findByIdAndUpdate(data._id, data, { new: true });
};

const del = async function (id: string) {

  const todo = await Todo.findById(id);
  if (!todo) {
    throw Error("Todo doesn't exist");
  }

  await todo.remove();
  
  return { id };
};

export default {
  add,
  get,
  update,
  del,
  getAll
};
