import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ConektaApiLogService } from "./conektaApiLog.service";
import { ConektaApiLogControllerBase } from "./base/conektaApiLog.controller.base";

@swagger.ApiTags("conektaApiLogs")
@common.Controller("conektaApiLogs")
export class ConektaApiLogController extends ConektaApiLogControllerBase {
  constructor(
    protected readonly service: ConektaApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
