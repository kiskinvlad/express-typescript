
import { Router, Request, Response, NextFunction } from 'express';
/**
 *  Remove next if using mongo
 */
import { Company } from '../../schemas/sequelize/company';
import { User } from '../../schemas/sequelize/user';
/**
 * Remove next if using postgres
 */
import mongoose from "mongoose";
import { IUserModel } from '../../interfaces/IUserModel';
import { userMongoSchema } from '../../schemas/mongo/user';
import { ICompanyModel } from '../../interfaces/ICompanyModel';
import { companyMongoSchema } from '../../schemas/mongo/compnay';
class CompanyRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    process.env.DB_NAME === 'psql' ? this.initializeSequelizeRouter() : this.initializeMongoRouter()
  }

  /**
   * Sequilize router
   */
  private initializeSequelizeRouter(): void {

    this.router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.body.id;
      const body = req.body;
      try {
        res.status(200).json(await Company.update(
          body,
          { where: {id: id}}
        ));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(await Company.findAll());
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.id;
      try {
        res.status(200).json(await Company.findById(id));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.companyId;
      try {
        res.status(200).json(await User.findAll(
          {where: {companyId: id}}
        ));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/*', async (req: Request, res: Response, next: NextFunction) => {
      const e = {status: 404, message: 'Not Found'}
      res.status(e.status).json({message: e.message});
      next();
    })
    
  }

  /**
   * Mongo router
   */
  private initializeMongoRouter(): void {

    const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", userMongoSchema);
    const Company: mongoose.Model<ICompanyModel> = mongoose.model<ICompanyModel>("Company", companyMongoSchema);

    this.router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
      const name = req.body.name;
      const body = req.body;
      try {
        res.status(200).json(await Company.update(
          { name: name },
          body
        ));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(await Company.find({}));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      const name = req.query.name;
      try {
        res.status(200).json(await Company.find({name: name}));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.companyId;
      try {
        res.status(200).json(await User.find(
          {companyId: id}
        ));
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
      }
    });

    this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
      } catch (e) {
        res.status(500).json({message: e.message, name: e.name})
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
