"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var config_1 = require("./config");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.setupConfigurations();
        this.mountRoutes();
        this.handleErrors();
    }
    App.prototype.setupConfigurations = function () {
        this.express.use(bodyParser.json());
        this.express.use(methodOverride());
    };
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    };
    App.prototype.handleErrors = function () {
        this.express.use(config_1.ErrorHandler.logErrors);
        this.express.use(config_1.ErrorHandler.clientErrorHandler);
        this.express.use(config_1.ErrorHandler.errorHandler);
    };
    return App;
}());
exports.default = new App().express;
