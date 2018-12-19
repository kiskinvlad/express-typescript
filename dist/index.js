"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var config_1 = require("./config");
var App_1 = __importDefault(require("./App"));
require.main.filename = 'index.js';
var port = process.env.PORT || 3000;
var name = process.env.NAME;
App_1.default.listen(port, function (err) {
    if (err) {
        return config_1.logger.error(err);
    }
    return config_1.logger.info("Hello " + name + ", server is listening on port " + port);
});
