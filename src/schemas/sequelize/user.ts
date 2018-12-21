import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  IsEmail,
  DataType,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Company } from "./company";

@Table
export class User extends Model<User> {

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  static scope(...args: any[]): typeof User {
    args[0] = args[0] || 'defaultScope';
    return super.scope.call(this, ...args);
  }
  
}

