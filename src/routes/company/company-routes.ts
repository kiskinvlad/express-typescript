
import { Router, Request, Response, NextFunction } from 'express';
import { Company } from '../../schemas/sequelize/company';
import { User } from '../../schemas/sequelize/user';
class CompanyRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeSequelizeRouter();
  }

  private initializeSequelizeRouter(): void {

    this.router.put('/', async (req: Request, res: Response, next: NextFunction) => {
      const where = req.body.where;
      const key = req.body.fieldName;
      const value = req.body.value;
      try {
        res.status(200).json(await Company.update(
          { key: value },
          { where: where}
        ));
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(await Company.findAll());
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.id;
      try {
        res.status(200).json(await Company.findById(id));
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.companyId;
      try {
        res.status(200).json(await User.findAll(
          {where: {companyId: id}}
        ));
      } catch (e) {
        next(e);
      }
    });

    this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
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

export default new CompanyRoutes().router;
