import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FinancedSaleService } from "./financedSale.service";
import { FinancedSaleControllerBase } from "./base/financedSale.controller.base";

@swagger.ApiTags("financedSales")
@common.Controller("financedSales")
export class FinancedSaleController extends FinancedSaleControllerBase {
  constructor(
    protected readonly service: FinancedSaleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
