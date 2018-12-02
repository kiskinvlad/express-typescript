"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const dotenv = require("dotenv");
const config_1 = require("./config");
dotenv.config();
const port = process.env.PORT || 3000;
App_1.default.listen(port, (err) => {
    if (err) {
        return config_1.logger.error(err);
    }
    return config_1.logger.info(`Server is listening on port ${port}`);
});
