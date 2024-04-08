import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TimelyPayDiscountService } from "./timelyPayDiscount.service";
import { TimelyPayDiscountControllerBase } from "./base/timelyPayDiscount.controller.base";

@swagger.ApiTags("timelyPayDiscounts")
@common.Controller("timelyPayDiscounts")
export class TimelyPayDiscountController extends TimelyPayDiscountControllerBase {
  constructor(
    protected readonly service: TimelyPayDiscountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
