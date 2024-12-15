import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CashSaleDetailService } from "./cashSaleDetail.service";
import { CashSaleDetailControllerBase } from "./base/cashSaleDetail.controller.base";

@swagger.ApiTags("cashSaleDetails")
@common.Controller("cashSaleDetails")
export class CashSaleDetailController extends CashSaleDetailControllerBase {
  constructor(
    protected readonly service: CashSaleDetailService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
