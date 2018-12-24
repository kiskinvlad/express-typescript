"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const method_override_1 = __importDefault(require("method-override"));
const q_1 = __importDefault(require("q"));
const mongoose_1 = __importDefault(require("mongoose")); //import mongoose
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const config_2 = require("./config");
const routes_1 = require("./routes");
const config_3 = require("./config");
const user_1 = require("./schemas/mongo/user");
class App {
    constructor() {
        this.model = Object();
        global.Promise = q_1.default.Promise;
        this.express = express_1.default();
        this.setupConfigurations();
        if (process.env.NODE_ENV !== 'test') {
            this.setupMongo();
            this.setupPostgress();
        }
        this.mountAPIRoutes();
        this.handleErrors();
    }
    setupConfigurations() {
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(method_override_1.default());
        this.express.set('view options', { layout: false });
        this.express.use(express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
        this.express.use('/', express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
    }
    setupMongo() {
        mongoose_1.default.Promise = global.Promise;
        const MONGODB_CONNECTION = "mongodb://localhost:27017/mongoDB";
        const connection = mongoose_1.default.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
        this.model.user = connection.model("User", user_1.userMongoSchema);
    }
    setupPostgress() {
        config_3.sequelize.sync({ force: false }).then(() => {
            config_1.logger.info('Connection synced');
            return;
        });
    }
    mountAPIRoutes() {
        this.express.use('/api/user', routes_1.userApi);
        this.express.use('/api/company', routes_1.companyApi);
        this.express.use('/api', routes_1.api);
    }
    handleErrors() {
        this.express.use(morgan_1.default('dev'));
        this.express.use(config_2.ErrorHandler.logErrors);
        this.express.use(config_2.ErrorHandler.clientErrorHandler);
        this.express.use(config_2.ErrorHandler.errorHandler);
    }
}
exports.default = new App().express;
