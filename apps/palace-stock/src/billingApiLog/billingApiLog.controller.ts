import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingApiLogService } from "./billingApiLog.service";
import { BillingApiLogControllerBase } from "./base/billingApiLog.controller.base";

@swagger.ApiTags("billingApiLogs")
@common.Controller("billingApiLogs")
export class BillingApiLogController extends BillingApiLogControllerBase {
  constructor(
    protected readonly service: BillingApiLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
