import { Sequelize } from 'sequelize-typescript';
import { dbconfig } from '../constants/index';
import { User } from '../schemas/sequelize/user';
import { Company } from '../schemas/sequelize/company';

export const sequelize =  new Sequelize({
  dialect: dbconfig.dialect,
  database: dbconfig.database,
  host: dbconfig.host,
  port: dbconfig.port,
  username: dbconfig.username,
  password: dbconfig.password,
  logging: process.env.NODE_ENV === 'test' ? false : true
});

sequelize.addModels([User, Company]);


