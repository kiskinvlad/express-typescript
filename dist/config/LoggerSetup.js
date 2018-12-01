"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const appRoot = require("app-root-path");
class Logger {
    constructor() {
        const loggerOptions = this.initializeLoggerOptions();
        this.winston = this.setupWinstonLogger(loggerOptions);
    }
    initializeLoggerOptions() {
        const loggerFormat = winston.format.printf(info => {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        });
        const options = {
            file: {
                level: process.env.NODE_ENV == 'production' ? 'error' : 'debug',
                filename: `${appRoot}/logs/app.log`,
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
                json: false,
                colorize: true,
                format: winston.format.combine(winston.format.label({ label: `${process.env.NODE_ENV.toUpperCase()}-LOGS` }), winston.format.timestamp(), loggerFormat)
            },
        };
        return options;
    }
    setupWinstonLogger(options) {
        const logger = winston.createLogger({
            transports: [
                new winston.transports.File(options.file),
                new winston.transports.Console(options.console)
            ],
            exitOnError: false,
        });
        return logger;
    }
}
exports.default = new Logger().winston;
