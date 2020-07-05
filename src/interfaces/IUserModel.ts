import { Model } from 'mongoose';
import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials(email : string , password : string): Promise<IUserDocument>; 
}