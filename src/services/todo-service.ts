import Todo from "../models/todo";
import EveryTodo from "../models/everyTodo";

const addTodo = async function (data: {
  name: string;
  description: string;
  todoType: string;
  date: string;
}) {
  const date = new Date(data.date);
  let todo;
  if (data.todoType === "Common") {
    todo = new Todo({
      name: data.name,
      description: data.description,
      date: date,
    });
  } else {
    todo = new EveryTodo({
      name: data.name,
      description: data.description,
      todoType: data.todoType,
    });
    if (data.todoType === "EveryWeek") {
      todo.date = date.getDay();
    } else if (data.todoType === "EveryMonth") {
      todo.date = date.getDate();
    }
  }
  await todo.save();
  return { ok: "all ok" };
};

const getTodo = async function (id: string) {
  let todo = await Todo.findById(id);
  if (!todo) {
    todo = await EveryTodo.findById(id);
    if (!todo) {
      throw Error("Todo doesn't exist");
    }
  }
  return todo;
};

const getTodayTodos = async function () {
  let Today = new Date();
  const dayOfMonth = Today.getDate();
  const day = Today.getDay();

  const CommonTodos = await Todo.find();
  const EveryTodos = await EveryTodo.aggregate([
    {
      $facet: {
        monthTodos: [{ $match: { todoType: "EveryMonth", date: dayOfMonth } }],
        dayTodos: [{ $match: { todoType: "EveryDay" } }],
        weekTodos: [{ $match: { todoType: "EveryWeek", date: day } }],
      },
    },
  ]);
  EveryTodos[0].commonTodos = CommonTodos;

  return EveryTodos[0];
};

const getMonthTodos = async function ({ month = "0", year = "2020" }) {
  const CommonTodos = await Todo.find({
    date: {
      $gte: new Date(+year, +month),
      $lt: new Date(+year, +month + 1),
    },
  });
  const EveryTodos = await EveryTodo.aggregate([
    {
      $facet: {
        monthTodos: [{ $match: { todoType: "EveryMonth" } }],
        dayTodos: [{ $match: { todoType: "EveryDay" } }],
        weekTodos: [{ $match: { todoType: "EveryWeek" } }],
      },
    },
  ]);
  EveryTodos[0].commonTodos = CommonTodos;

  return EveryTodos[0];
};

const updateTodo = async function (data: {
  name: string;
  description: string;
  todoType: string;
  _id: string;
}) {

  const updateData = { name: data.name, description: data.description };
  if (data.todoType === "Common") {
    return await Todo.findByIdAndUpdate(data._id, updateData, { new: true });
  } else {
    return await EveryTodo.findByIdAndUpdate(data._id, updateData, {
      new: true,
    });
  }
};

const delTodo = async function (id: string) {
  let todo = await Todo.findById(id);
  if (!todo) {
    todo = await EveryTodo.findById(id);
    if (!todo) {
      throw Error("Todo doesn't exist");
    }
  }

  await todo.remove();

  return { id };
};

export default {
  addTodo,
  getTodo,
  updateTodo,
  delTodo,
  getTodayTodos,
  getMonthTodos,
};
