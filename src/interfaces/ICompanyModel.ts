import { Document } from "mongoose";
import { CompanyModel } from "../models/company";

export interface ICompanyModel extends CompanyModel, Document {
  //custom methods for your model would be defined here
}