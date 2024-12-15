import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { KardexSeryService } from "./kardexSery.service";
import { KardexSeryControllerBase } from "./base/kardexSery.controller.base";

@swagger.ApiTags("kardexSeries")
@common.Controller("kardexSeries")
export class KardexSeryController extends KardexSeryControllerBase {
  constructor(
    protected readonly service: KardexSeryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
