import * as winston from 'winston';
import * as appRoot from 'app-root-path';

class Logger {

  public winston: winston.Logger;

  constructor() {
    const loggerOptions = this.initializeLoggerOptions();
    this.winston = this.setupWinstonLogger(loggerOptions);
  }

  private initializeLoggerOptions(): any {
    const loggerFormat = winston.format.printf(info => {
      return `${info.timestamp.slice(0, 19).replace('T', ' ')} [${info.label}] ${info.level}: ${info.message}`;
    });
    const options = {
      file: {
        level: process.env.NODE_ENV == 'production' ? 'error' : 'debug',
        filename: `${appRoot}/logs/app.log`,
        options: { flags: 'w'},
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
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.label({ label: `${process.env.NODE_ENV.toUpperCase()}-LOGS` }),
          winston.format.timestamp(),
          loggerFormat
        )
      },
    }
    return options;
  }

  private setupWinstonLogger(options): winston.Logger {
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

export default new Logger().winston;