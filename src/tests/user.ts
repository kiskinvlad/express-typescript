import { suite, test } from "mocha-typescript";
import mongoose from "mongoose";

import { IUserModel } from "../interfaces/IUserModel";
import { IModel } from "../interfaces/index";
import { User } from "../models/user";
import { userSchema } from "../schemas/user";

@suite
class MongoTest {

  private data: User;
  public static User: mongoose.Model<IUserModel>;

  public static before() {
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose and create model
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/db";
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    MongoTest.User = connection.model<IUserModel>("User", userSchema);

    //require chai and use should() assertions
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = {
      email: "kiskinvlad@gmail.com",
      firstName: "Kiskin",
      lastName: "Vlad"
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