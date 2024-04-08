import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ScheduledTasksLogService } from "./scheduledTasksLog.service";
import { ScheduledTasksLogControllerBase } from "./base/scheduledTasksLog.controller.base";

@swagger.ApiTags("scheduledTasksLogs")
@common.Controller("scheduledTasksLogs")
export class ScheduledTasksLogController extends ScheduledTasksLogControllerBase {
  constructor(
    protected readonly service: ScheduledTasksLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
