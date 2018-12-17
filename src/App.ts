import path from 'path';
import express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config';
import methodOverride from 'method-override';
import q from 'q'
import mongoose from 'mongoose'; //import mongoose

import { logger } from "./config";
import { ErrorHandler } from "./config";
import { api } from './routes'

import { IUserModel } from "./interfaces/IUserModel";
import { IModel } from "./interfaces/index";
import { User } from "./models/user";
import { userSchema } from "./schemas/user";

class App { 

  public express: express.Application; 
  private model: IModel;

  constructor () { 
    this.model = Object();

    global.Promise = q.Promise;

    this.express = express();
    this.setupConfigurations();
    this.mountAPIRoutes();
    this.handleErrors();

    this.setupMongo();
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

  private setupMongo(): void {
    mongoose.Promise = global.Promise;
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/mongoDB";
    const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
    this.model.user = connection.model<IUserModel>("User", userSchema);
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