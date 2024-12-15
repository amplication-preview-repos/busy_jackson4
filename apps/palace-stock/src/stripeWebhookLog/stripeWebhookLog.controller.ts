import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StripeWebhookLogService } from "./stripeWebhookLog.service";
import { StripeWebhookLogControllerBase } from "./base/stripeWebhookLog.controller.base";

@swagger.ApiTags("stripeWebhookLogs")
@common.Controller("stripeWebhookLogs")
export class StripeWebhookLogController extends StripeWebhookLogControllerBase {
  constructor(
    protected readonly service: StripeWebhookLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
