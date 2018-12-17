"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
var method_override_1 = __importDefault(require("method-override"));
var q_1 = __importDefault(require("q"));
var mongoose_1 = __importDefault(require("mongoose")); //import mongoose
var config_1 = require("./config");
var routes_1 = require("./routes");
var user_1 = require("./schemas/user");
var App = /** @class */ (function () {
    function App() {
        this.model = Object();
        global.Promise = q_1.default.Promise;
        this.express = express_1.default();
        this.setupConfigurations();
        this.mountAPIRoutes();
        this.handleErrors();
        this.setupMongo();
    }
    App.prototype.setupConfigurations = function () {
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(method_override_1.default());
        this.express.set('view options', { layout: false });
        this.express.use(express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
        this.express.use('/', express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
    };
    App.prototype.setupMongo = function () {
        var MONGODB_CONNECTION = "mongodb://localhost:27017/mongoDB";
        mongoose_1.default.Promise = global.Promise;
        var connection = mongoose_1.default.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
        this.model.user = connection.model("User", user_1.userSchema);
    };
    App.prototype.mountAPIRoutes = function () {
        this.express.use('/api', routes_1.api);
    };
    App.prototype.handleErrors = function () {
        this.express.use(config_1.ErrorHandler.logErrors);
        this.express.use(config_1.ErrorHandler.clientErrorHandler);
        this.express.use(config_1.ErrorHandler.errorHandler);
    };
    return App;
}());
exports.default = new App().express;
