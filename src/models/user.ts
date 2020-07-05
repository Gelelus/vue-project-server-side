import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUserDocument } from "../interfaces/IUserDocument";
import { IUserModel } from "../interfaces/IUserModel";

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatarImg: {
    type: String,
    trim: true,
    default: "img/avatars/avatar.png",
  },
  date: { type: Date, default: Date.now },
  firstName: {
    type: String,
    trim: true,
    default: "Nameless",
  },
  secondName: {
    type: String,
    trim: true,
    default: "User",
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: "+375",
  }
});

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IUserDocument> => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Unable user");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this as IUserDocument;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    "expressapp"
  );
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this as IUserDocument;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
