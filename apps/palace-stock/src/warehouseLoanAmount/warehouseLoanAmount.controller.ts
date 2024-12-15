import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WarehouseLoanAmountService } from "./warehouseLoanAmount.service";
import { WarehouseLoanAmountControllerBase } from "./base/warehouseLoanAmount.controller.base";

@swagger.ApiTags("warehouseLoanAmounts")
@common.Controller("warehouseLoanAmounts")
export class WarehouseLoanAmountController extends WarehouseLoanAmountControllerBase {
  constructor(
    protected readonly service: WarehouseLoanAmountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
