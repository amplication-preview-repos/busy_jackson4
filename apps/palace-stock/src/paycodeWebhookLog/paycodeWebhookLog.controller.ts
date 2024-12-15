import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaycodeWebhookLogService } from "./paycodeWebhookLog.service";
import { PaycodeWebhookLogControllerBase } from "./base/paycodeWebhookLog.controller.base";

@swagger.ApiTags("paycodeWebhookLogs")
@common.Controller("paycodeWebhookLogs")
export class PaycodeWebhookLogController extends PaycodeWebhookLogControllerBase {
  constructor(
    protected readonly service: PaycodeWebhookLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
