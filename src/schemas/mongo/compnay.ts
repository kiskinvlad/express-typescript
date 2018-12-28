import { Schema } from "mongoose";

export const companyMongoSchema: Schema = new Schema({
  createdAt: Date,
  name: {
    type: String,
    required: [true, 'Please fill company name'],
    unique: true,
    index: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    unique: false,
    index: false,
    trim: true,
  }
});

companyMongoSchema.pre("save", function(next) {
  if (!companyMongoSchema.createdAt) {
    companyMongoSchema.createdAt = new Date();
  }
  next();
});