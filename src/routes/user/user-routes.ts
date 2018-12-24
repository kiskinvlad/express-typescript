
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../schemas/sequelize/user';
class UserRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeSequelizeRouter();
  }

  private initializeSequelizeRouter(): void {

    this.router.patch('/', async (req: Request, res: Response) => {
      const id = req.query.id;
      const body = req.body;
      try {
        res.status(200).json(await User.update(
          body,
          { where: {id: id}}
        ));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/all', async (req: Request, res: Response) => {
      try {
        res.status(200).json(await User.findAll());
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/', async (req: Request, res: Response) => {
      const id = req.query.id;
      try {
        res.status(200).json(await User.findById(id));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });
    

    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const email = req.body.email;
        const exist = await User.findOne({where: {email: email}})
        if(!exist) {
          const user = await User.create(req.body);
          res.status(201).json(user);
        } else {
          const e = { status: 409, message: 'User with same email already exist', name: "USER_EMAIL_EXIST" }
          res.status(e.status).json({message: e.message, name: e.name})
        }
      } catch (e) {
        if(e.message.includes('email cannot be null')) {
          e.name = "EMAIL_IS_NULL"
          res.status(500).json({message: e.message, name: e.name})
        } else {
          e.name = "SOMETHING_WRONG"
          res.status(500).json({message: e.message, name: e.name})
        }
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
