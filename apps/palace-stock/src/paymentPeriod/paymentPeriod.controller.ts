import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentPeriodService } from "./paymentPeriod.service";
import { PaymentPeriodControllerBase } from "./base/paymentPeriod.controller.base";

@swagger.ApiTags("paymentPeriods")
@common.Controller("paymentPeriods")
export class PaymentPeriodController extends PaymentPeriodControllerBase {
  constructor(
    protected readonly service: PaymentPeriodService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
