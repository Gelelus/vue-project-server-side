import { IUserDocument } from "../interfaces/IUserDocument";
import User from "../models/user";

const add = async function (data: { password: string; email: string }) {
  const userTest = await User.findOne({ email: data.email });
  if (userTest) {
    throw new Error("Email already exists");
  }
  const user = new User(data);

  const token = await user.generateAuthToken();
  await user.save();

  return {
    idToken: token,
    localId: user._id,
    email: user.email,
    expiresIn: 3600,
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};

const get = async function (id: string) {
  let user = await User.findById(id);
  if (!user) {
    throw new Error("user doesn't exists");
  }
  return {
    email: user.email,
    avatarImg: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
    recipes: user.recipes,
  };
};

const getAll = async function () {
  return await User.find();
};

const update = async function (
  data: {
    firstName: string;
    passwords: { password: string; secondPassword: string };
    phoneNumber: string;
    secondName: string;
  },
  user: IUserDocument
) {
  user.firstName = data.firstName;
  user.secondName = data.secondName;
  user.phoneNumber = data.phoneNumber;
  if (data.passwords.password) {
    user.password = data.passwords.password;
  }

  const token = await user.generateAuthToken();
  await user.save();
  return {
    token: token,
    id: user._id,
    email: user.email,
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};

const del = async function (id: string) {
  return await User.findByIdAndDelete(id);
};

const login = async function (data: { password: string; email: string }) {
  const user = await User.findByCredentials(data.email, data.password);

  const token = await user.generateAuthToken();

  return {
    token: token,
    id: user._id,
    email: user.email,
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};



export default {
  add,
  get,
  update,
  del,
  getAll,
  login,
};
