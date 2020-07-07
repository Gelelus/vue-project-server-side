import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    age: string;
    email: string;
    name: string;
    password: string;
    avatarImg: string;
    recipes: string[];
    orders:string[];
    date: Date;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    generateAuthToken(): Promise<string>;
}