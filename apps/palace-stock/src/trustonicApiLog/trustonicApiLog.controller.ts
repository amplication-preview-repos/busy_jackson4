import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TrustonicApiLogService } from "./trustonicApiLog.service";
import { TrustonicApiLogControllerBase } from "./base/trustonicApiLog.controller.base";

@swagger.ApiTags("trustonicApiLogs")
@common.Controller("trustonicApiLogs")
export class TrustonicApiLogController extends TrustonicApiLogControllerBase {
  constructor(
    protected readonly service: TrustonicApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
