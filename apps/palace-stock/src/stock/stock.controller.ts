import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StockService } from "./stock.service";
import { StockControllerBase } from "./base/stock.controller.base";

@swagger.ApiTags("stocks")
@common.Controller("stocks")
export class StockController extends StockControllerBase {
  constructor(
    protected readonly service: StockService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
