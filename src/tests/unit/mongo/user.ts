import { suite, test } from "mocha-typescript";
import mongoose from "mongoose";

import { IUserModel } from "../../../interfaces/IUserModel";
import { IModel } from "../../../interfaces/index";
import { UserModel } from "../../../models/user";
import { userMongoSchema } from "../../../schemas/mongo/user";
import faker from 'faker';

@suite
class MongoTest {

  private data: UserModel;
  public static User: mongoose.Model<IUserModel>;

  public static before() {
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose and create model
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/db";
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    MongoTest.User = connection.model<IUserModel>("User", userMongoSchema);

    //require chai and use should() assertions
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };
  }

  @test("should create a new User")
  public createUser() {
    return new MongoTest.User(this.data).save().then(result => {
      result._id.should.exist;
      result.email.should.equal(this.data.email);
      result.firstName.should.equal(this.data.firstName);
      result.lastName.should.equal(this.data.lastName);
    });
  }

}