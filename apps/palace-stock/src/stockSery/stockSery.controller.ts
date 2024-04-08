import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StockSeryService } from "./stockSery.service";
import { StockSeryControllerBase } from "./base/stockSery.controller.base";

@swagger.ApiTags("stockSeries")
@common.Controller("stockSeries")
export class StockSeryController extends StockSeryControllerBase {
  constructor(
    protected readonly service: StockSeryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
