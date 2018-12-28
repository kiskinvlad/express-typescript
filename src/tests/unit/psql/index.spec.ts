import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { sequelize } from '../../../config';
import { sinon } from "sinon";
@suite
class InitializePostgres {
  public async before() {
    await sequelize.sync({force: false}).then(() => {
      return;
    });
  }
  constructor() {}

  @test("Postgres initializated")
  public async sequelizeCreated() {
    await require('./company.spec');
    await require('./user.spec');
  }
}