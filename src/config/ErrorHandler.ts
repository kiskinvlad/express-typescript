import { logger } from "./index";
import { NextFunction, Response, Request, ErrorRequestHandler } from "express";

abstract class ErrorHandler {

  static logErrors(err: Error, req: Request, res: Response) {
    logger.error(JSON.stringify(err));
  }

  static clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' });
    } else {
      next(err);
    }
  }
  static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500);
    logger.error(`${JSON.stringify(err.message)}`);
    res.render('error', { error: err});
  }
  
}

export default ErrorHandler;