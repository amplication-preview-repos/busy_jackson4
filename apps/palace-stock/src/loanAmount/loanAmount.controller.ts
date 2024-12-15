import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LoanAmountService } from "./loanAmount.service";
import { LoanAmountControllerBase } from "./base/loanAmount.controller.base";

@swagger.ApiTags("loanAmounts")
@common.Controller("loanAmounts")
export class LoanAmountController extends LoanAmountControllerBase {
  constructor(
    protected readonly service: LoanAmountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
