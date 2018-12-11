"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var appRoot = require("app-root-path");
var Logger = /** @class */ (function () {
    function Logger() {
        var loggerOptions = this.initializeLoggerOptions();
        this.winston = this.setupWinstonLogger(loggerOptions);
    }
    Logger.prototype.format = function () {
        var formatMessage = function (info) { return "[" + info.timestamp.slice(0, 19).replace('T', ' ') + "] " + info.level + ": " + info.message; };
        return winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.printf(formatMessage));
    };
    Logger.prototype.initializeLoggerOptions = function () {
        var options = {
            file: {
                level: process.env.NODE_ENV == 'production' ? 'error' : 'debug',
                filename: appRoot + "/logs/app.log",
                options: { flags: 'w' },
                handleExceptions: true,
                json: true,
                maxsize: 5242880,
                maxFiles: 5,
                colorize: false,
                format: winston.format.json()
            },
            console: {
                level: process.env.NODE_ENV == 'production' ? 'error' : 'debug',
                handleExceptions: true,
                options: { flags: 'w' },
                json: false,
                colorize: true,
                format: this.format(),
            },
        };
        return options;
    };
    Logger.prototype.setupWinstonLogger = function (options) {
        var logger = winston.createLogger({
            transports: [
                new winston.transports.File(options.file).on('flush', function () {
                    process.exit(0);
                }),
                new winston.transports.Console(options.console)
            ],
            exitOnError: false,
        });
        return logger;
    };
    return Logger;
}());
exports.default = new Logger().winston;
