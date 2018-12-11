"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv/config");
var methodOverride = require("method-override");
var config_1 = require("./config");
var routes_1 = require("./routes");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.setupConfigurations();
        this.mountAPIRoutes();
        this.handleErrors();
    }
    App.prototype.setupConfigurations = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(methodOverride());
        this.express.set('view options', { layout: false });
        this.express.use(express.static(path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
        this.express.use('/', express.static(path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
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
