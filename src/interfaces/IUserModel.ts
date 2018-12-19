import { Document } from "mongoose";
import { User } from "../models/user";

export interface IUserModel extends User, Document {
  //custom methods for your model would be defined here
}