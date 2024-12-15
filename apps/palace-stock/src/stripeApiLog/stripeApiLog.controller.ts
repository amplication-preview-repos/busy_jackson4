import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StripeApiLogService } from "./stripeApiLog.service";
import { StripeApiLogControllerBase } from "./base/stripeApiLog.controller.base";

@swagger.ApiTags("stripeApiLogs")
@common.Controller("stripeApiLogs")
export class StripeApiLogController extends StripeApiLogControllerBase {
  constructor(
    protected readonly service: StripeApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
