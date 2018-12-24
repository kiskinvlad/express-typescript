import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  DataType,
  HasMany
} from "sequelize-typescript";
import { User } from "./user";

@Table
export class Company extends Model<Company> {

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  address: string;

  @HasMany(() => User)
  users: User[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  static scope(...args: any[]): typeof Company {
    args[0] = args[0] || 'defaultScope';
    return super.scope.call(this, ...args);
  }
  
}

