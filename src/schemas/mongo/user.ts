import { Schema } from "mongoose";

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

export const userMongoSchema: Schema = new Schema({
  createdAt: Date,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
    index: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
    index: false,
    trim: true,
  },
  companyId: {
    type: Number,
    required: false,
    unique: false,
    index: false,
  }
});

userMongoSchema.pre("save", function(next) {
  if (!userMongoSchema.createdAt) {
    userMongoSchema.createdAt = new Date();
  }
  next();
});