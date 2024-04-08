import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AngazaApiLogService } from "./angazaApiLog.service";
import { AngazaApiLogControllerBase } from "./base/angazaApiLog.controller.base";

@swagger.ApiTags("angazaApiLogs")
@common.Controller("angazaApiLogs")
export class AngazaApiLogController extends AngazaApiLogControllerBase {
  constructor(
    protected readonly service: AngazaApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
