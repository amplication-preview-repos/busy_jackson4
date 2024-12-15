import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PersonalLoanService } from "./personalLoan.service";
import { PersonalLoanControllerBase } from "./base/personalLoan.controller.base";

@swagger.ApiTags("personalLoans")
@common.Controller("personalLoans")
export class PersonalLoanController extends PersonalLoanControllerBase {
  constructor(
    protected readonly service: PersonalLoanService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
