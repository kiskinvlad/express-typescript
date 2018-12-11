"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.logErrors = function (err, req, res) {
        index_1.logger.error(JSON.stringify(err));
    };
    ErrorHandler.clientErrorHandler = function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' });
        }
        else {
            next(err);
        }
    };
    ErrorHandler.errorHandler = function (err, req, res, next) {
        res.status(500).send({ error: err.message });
    };
    return ErrorHandler;
}());
exports.default = ErrorHandler;
