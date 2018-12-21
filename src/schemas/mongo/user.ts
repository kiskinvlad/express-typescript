import { Schema } from "mongoose";

export const userMongoSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String
});
userMongoSchema.pre("save", function(next) {
  if (!userMongoSchema.createdAt) {
    userMongoSchema.createdAt = new Date();
  }
  next();
});