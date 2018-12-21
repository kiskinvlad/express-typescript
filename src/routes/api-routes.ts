
import { Router, Request, Response, NextFunction } from 'express';
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

    this.router.get('/*', async (req: Request, res: Response, next: NextFunction) => {
      const e = {status: 404, message: 'Not Found'}
      res.status(e.status).json({message: e.message});
      next();
    })
    
  }
  
}

export default new MainRoutes().router;
