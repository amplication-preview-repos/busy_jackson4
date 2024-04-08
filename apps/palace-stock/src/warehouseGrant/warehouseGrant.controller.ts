import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WarehouseGrantService } from "./warehouseGrant.service";
import { WarehouseGrantControllerBase } from "./base/warehouseGrant.controller.base";

@swagger.ApiTags("warehouseGrants")
@common.Controller("warehouseGrants")
export class WarehouseGrantController extends WarehouseGrantControllerBase {
  constructor(
    protected readonly service: WarehouseGrantService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
