
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../schemas/sequelize/user';
class UserRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeSequelizeRouter();
  }

  private initializeSequelizeRouter(): void {

    this.router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.id;
      const body = req.body;
      try {
        res.status(200).json(await User.update(
          body,
          { where: {id: id}}
        ));
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(await User.findAll());
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.id;
      try {
        res.status(200).json(await User.findById(id));
      } catch (e) {
        next(e);
      }
    });
    

    this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await User.create(req.body);
        res.status(201).json(user);
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/*', async (req: Request, res: Response, next: NextFunction) => {
      const e = {status: 404, message: 'Not Found'}
      res.status(e.status).json({message: e.message});
      next();
    })
    
  }
  
}

export default new UserRoutes().router;
