import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NuovoApiLogService } from "./nuovoApiLog.service";
import { NuovoApiLogControllerBase } from "./base/nuovoApiLog.controller.base";

@swagger.ApiTags("nuovoApiLogs")
@common.Controller("nuovoApiLogs")
export class NuovoApiLogController extends NuovoApiLogControllerBase {
  constructor(
    protected readonly service: NuovoApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
