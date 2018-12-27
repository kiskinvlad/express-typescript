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
  public sequelizeCreated(): void {
    require('./company.spec');
    require('./user.spec');
  }
}