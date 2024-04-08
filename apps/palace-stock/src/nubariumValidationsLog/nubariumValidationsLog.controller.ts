import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NubariumValidationsLogService } from "./nubariumValidationsLog.service";
import { NubariumValidationsLogControllerBase } from "./base/nubariumValidationsLog.controller.base";

@swagger.ApiTags("nubariumValidationsLogs")
@common.Controller("nubariumValidationsLogs")
export class NubariumValidationsLogController extends NubariumValidationsLogControllerBase {
  constructor(
    protected readonly service: NubariumValidationsLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
