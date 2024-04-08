import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaycodeApiLogService } from "./paycodeApiLog.service";
import { PaycodeApiLogControllerBase } from "./base/paycodeApiLog.controller.base";

@swagger.ApiTags("paycodeApiLogs")
@common.Controller("paycodeApiLogs")
export class PaycodeApiLogController extends PaycodeApiLogControllerBase {
  constructor(
    protected readonly service: PaycodeApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
