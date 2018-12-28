"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.userMongoSchema = new mongoose_1.Schema({
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
exports.userMongoSchema.pre("save", function (next) {
    if (!exports.userMongoSchema.createdAt) {
        exports.userMongoSchema.createdAt = new Date();
    }
    next();
});
