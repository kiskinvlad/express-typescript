import * as express from "express";
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import { logger } from "./config";
import { ErrorHandler } from "./config";
class App { 

  public express: express.Application; 

  constructor () { 
    this.express = express();
    this.setupConfigurations();
    this.mountRoutes();
    this.handleErrors();

  }

  private setupConfigurations(): void {
    this.express.use(bodyParser.json());
    this.express.use(methodOverride());
  }

  private mountRoutes(): void { 
    const router = express.Router() 
    router.get('/', (req, res) => { 
      res.json({ 
        message: 'Hello World!' 
      }) 
    }) 
    this.express.use('/', router) 
  }
  
  private handleErrors(): void {
    this.express.use(ErrorHandler.logErrors);
    this.express.use(ErrorHandler.clientErrorHandler);
    this.express.use(ErrorHandler.errorHandler);
  }
} 
export default new App().express