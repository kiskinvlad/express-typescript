import { suite, test } from "mocha-typescript";
import { Company } from "../../../schemas/sequelize/company";
import { CompanyModel } from "../../../models/company";

import faker from 'faker';
import { Sequelize } from "sequelize-typescript";
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} from 'sequelize-test-helpers';
import { expect } from "chai";
import App from "../../../App";
import chai from "chai";
import chaiHttp from 'chai-http';

@suite
class CompanyTest {
  private company: Company;
  private fakeCompany: CompanyModel;

  public static before() {
    chai.use(chaiHttp)
    chai.should();
  }

  public static beforeEach() {
    Company.sync({logging: console.log })

  }

  constructor() {
    this.company = new Company();
    this.fakeCompany = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress()
    }
    checkModelName(this.company)('Company')
  }

  @test("Properties should exist")
  public checkProperties(): void {
    context('company properties', () => {
      ;[
        'name',
        'address',
      ].forEach(checkPropertyExists(this.company))
    });
  }

  @test("Check assoiciations")
  public checkAssociations(): void {
    const Association: any = Sequelize['Association'];

    expect(Company)
    .to.have.property('associations')
    .that.has.property('users')
    .that.is.an.instanceOf(Association['HasMany'])
  }

  @test("Create company")
  public async createCompany(): Promise<void> {
    return await chai.request(App)
      .post('/api/company')
      .send(this.fakeCompany).then((res) => { 
        res.body.should.be.a('object');
        expect(res).to.have.status(201)
        expect(res.body).to.deep.include(this.fakeCompany);
      })
  }

  @test("Shouldn't create company")
  public async createInvalidUser(): Promise<void> {
    this.fakeCompany.name = null;
    return await chai.request(App)
      .post('/api/company')
      .send(this.fakeCompany)
      .then((res) => {
        res.body.should.be.a('object');
        expect(res.body.address).to.not.exist
        expect(res).to.have.status(500)
      })
  }

  @test("Should create a new Company with name `Company`")
  public async createCompanyWithName(): Promise<void> {
    this.fakeCompany.name = 'Company';
    return await chai.request(App)
    .post('/api/company')
    .send(this.fakeCompany)
    .then((res) => {
      expect(res.body.name).to.be.equal('Company');
      expect(res).to.have.status(201);
    })
  }

  @test("Should find company with id = 1")
  public async getCompanyWithName(): Promise<void> {
    const id = 1;
    return await chai.request(App)
    .get('/api/company')
    .query({id: id})
    .then((res) => {
      res.body.should.exist;
      res.body.id.should.be.equal(id);
    })
  }

}