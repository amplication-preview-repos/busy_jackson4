import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CashSaleService } from "./cashSale.service";
import { CashSaleControllerBase } from "./base/cashSale.controller.base";

@swagger.ApiTags("cashSales")
@common.Controller("cashSales")
export class CashSaleController extends CashSaleControllerBase {
  constructor(
    protected readonly service: CashSaleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
