import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { KardexService } from "./kardex.service";
import { KardexControllerBase } from "./base/kardex.controller.base";

@swagger.ApiTags("kardexes")
@common.Controller("kardexes")
export class KardexController extends KardexControllerBase {
  constructor(
    protected readonly service: KardexService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
