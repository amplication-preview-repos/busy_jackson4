import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingWebhookLogService } from "./billingWebhookLog.service";
import { BillingWebhookLogControllerBase } from "./base/billingWebhookLog.controller.base";

@swagger.ApiTags("billingWebhookLogs")
@common.Controller("billingWebhookLogs")
export class BillingWebhookLogController extends BillingWebhookLogControllerBase {
  constructor(
    protected readonly service: BillingWebhookLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
