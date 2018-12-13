"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var config_1 = require("./config");
var App_1 = require("./App");
require.main.filename = 'index.js';
var port = process.env.PORT || 3000;
App_1.default.listen(port, function (err) {
    if (err) {
        return config_1.logger.error(err);
    }
    return config_1.logger.info("Server is listening on port " + port);
});
