"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const index_1 = require("../constants/index");
const user_1 = require("../schemas/sequelize/user");
const company_1 = require("../schemas/sequelize/company");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: index_1.dbconfig.dialect,
    database: index_1.dbconfig.database,
    host: index_1.dbconfig.host,
    port: index_1.dbconfig.port,
    username: index_1.dbconfig.username,
    password: index_1.dbconfig.password,
    logging: process.env.NODE_ENV === 'test' ? false : console.log,
    operatorsAliases: false
});
exports.sequelize.addModels([user_1.User, company_1.Company]);
