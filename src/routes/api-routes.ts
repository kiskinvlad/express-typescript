
import { Router, Request, Response } from 'express';
import * as path from 'path';
import * as express from 'express';

class MainRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Connected!' });
    });
  }
  
}

export default new MainRoutes().router;
