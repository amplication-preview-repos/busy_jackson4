import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SmsMasivosApiLogService } from "./smsMasivosApiLog.service";
import { SmsMasivosApiLogControllerBase } from "./base/smsMasivosApiLog.controller.base";

@swagger.ApiTags("smsMasivosApiLogs")
@common.Controller("smsMasivosApiLogs")
export class SmsMasivosApiLogController extends SmsMasivosApiLogControllerBase {
  constructor(
    protected readonly service: SmsMasivosApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
