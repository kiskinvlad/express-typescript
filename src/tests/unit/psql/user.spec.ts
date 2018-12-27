import { suite, test } from "mocha-typescript";
import { User } from "../../../schemas/sequelize/user";
import { UserModel } from "../../../models/user";

import faker from "faker";
import { Sequelize } from "sequelize-typescript";
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} from "sequelize-test-helpers";
import { expect } from "chai";
import App from "../../../App";
import chai from "chai";
import chaiHttp from 'chai-http';

@suite
class UserTest {
  private user: User;
  private fakeUser: UserModel;

  public static before() {
    //require chai and use should() assertions
    chai.use(chaiHttp)
    chai.should();
  }

  constructor() {
    this.user = new User();
    this.fakeUser = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      //companyId: 1
    }
  
    checkModelName(this.user)('User')
  }

  @test("Properties should exist")
  public checkProperties(): void {
    context('user properties', () => {
      ;[
        'email',
        'firstName',
        'lastName',
        "companyId"
      ].forEach(checkPropertyExists(this.user))
    });
  }

  @test("Check assoiciations")
  public checkAssociations(): void {
    const Association: any = Sequelize['Association'];

    expect(User)
    .to.have.property('associations')
    .that.has.property('company')
    .that.is.an.instanceOf(Association['BelongsTo'])
    .and.has.property('foreignKey', 'companyId')
  }
  
  @test("Create user")
  public async createUser(): Promise<void> {
    return await chai.request(App)
      .post('/api/user')
      .send(this.fakeUser)
      .then((res) => { 
        res.body.should.be.a('object');
        expect(res).to.have.status(201)
        expect(res.body).to.deep.include(this.fakeUser);
      })
  }

  @test("Create user with company Id")
  public async createUserWithCompany(): Promise<void>  {
    this.fakeUser.companyId = 1;
    return await chai.request(App)
      .post('/api/user')
      .send(this.fakeUser)
      .then((res) => { 
        res.body.should.be.a('object');
        expect(res).to.have.status(201)
        expect(res.body).to.deep.include(this.fakeUser);
      })
  }

  @test("Shouldn't create invalid user")
  public async createInvalidUser(): Promise<void> {
    this.fakeUser.email = null;
    return await chai.request(App)
      .post('/api/user')
      .send(this.fakeUser)
      .then((res) => {
        res.body.should.be.a('object');
        expect(res).to.have.status(500)
        expect(res.body.email).to.not.exist
      })
  }

}     