import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ComunApiLogService } from "./comunApiLog.service";
import { ComunApiLogControllerBase } from "./base/comunApiLog.controller.base";

@swagger.ApiTags("comunApiLogs")
@common.Controller("comunApiLogs")
export class ComunApiLogController extends ComunApiLogControllerBase {
  constructor(
    protected readonly service: ComunApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
