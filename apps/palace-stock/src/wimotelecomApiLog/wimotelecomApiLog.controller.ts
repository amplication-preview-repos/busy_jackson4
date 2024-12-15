import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WimotelecomApiLogService } from "./wimotelecomApiLog.service";
import { WimotelecomApiLogControllerBase } from "./base/wimotelecomApiLog.controller.base";

@swagger.ApiTags("wimotelecomApiLogs")
@common.Controller("wimotelecomApiLogs")
export class WimotelecomApiLogController extends WimotelecomApiLogControllerBase {
  constructor(
    protected readonly service: WimotelecomApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
