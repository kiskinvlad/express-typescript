import { suite, test } from "mocha-typescript";
import mongoose from "mongoose";

import { IModel } from "../../../interfaces/index";
import faker from 'faker';
import { CompanyModel } from "../../../models/company";
import { ICompanyModel } from "../../../interfaces/ICompanyModel";
import { companyMongoSchema } from "../../../schemas/mongo/compnay";
import { InitializeMongo } from "./index.spec";

@suite
class CompanyTest {

  private data: CompanyModel;
  public static Company: mongoose.Model<ICompanyModel>;

  public static before() {
    CompanyTest.Company = InitializeMongo.getConnection().model<ICompanyModel>("Company", companyMongoSchema);
  }

  constructor() {
    this.data = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress()
    };
  }

  @test("Should create a new Company")
  public createUser(): Promise<void> {
    return new CompanyTest.Company(this.data).save().then(result => {
      result._id.should.exist;
      result.name.should.equal(this.data.name);
      result.address.should.equal(this.data.address);
    });
  }

  @test("Shouldn't create invalid Company")
  public async createInvalidUser(): Promise<void> {
    this.data.name = null;
    return new CompanyTest.Company(this.data).save().then(result => {
      result._id.should.not.exist;
    }).catch((e) => {
      e.should.exist;
      e.errors.name.should.exist;
      e.errors.name.message.should.be.equal('Please fill company name')
    });
  }

}