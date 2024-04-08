import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ConektaWebhookLogService } from "./conektaWebhookLog.service";
import { ConektaWebhookLogControllerBase } from "./base/conektaWebhookLog.controller.base";

@swagger.ApiTags("conektaWebhookLogs")
@common.Controller("conektaWebhookLogs")
export class ConektaWebhookLogController extends ConektaWebhookLogControllerBase {
  constructor(
    protected readonly service: ConektaWebhookLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
