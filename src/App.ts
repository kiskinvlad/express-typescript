import * as express from "express";
import * as bodyParser from 'body-parser';
import 'dotenv/config';
import * as methodOverride from 'method-override';
import * as path from 'path';
import { logger } from "./config";
import { ErrorHandler } from "./config";
import { api } from './routes'

class App { 

  public express: express.Application; 

  constructor () { 
    this.express = express();
    this.setupConfigurations();
    this.mountAPIRoutes();
    this.handleErrors();
  }

  private setupConfigurations(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(methodOverride());
    this.express.set('view options', {layout: false});
    this.express.use(express.static(
      path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static'))
    );
    this.express.use('/', express.static(
      path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static'))
    )
  }

  private mountAPIRoutes(): void { 
    this.express.use('/api', api) 
  }
  
  private handleErrors(): void {
    this.express.use(ErrorHandler.logErrors);
    this.express.use(ErrorHandler.clientErrorHandler);
    this.express.use(ErrorHandler.errorHandler);
  }
} 
export default new App().express