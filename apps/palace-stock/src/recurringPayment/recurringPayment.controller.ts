import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RecurringPaymentService } from "./recurringPayment.service";
import { RecurringPaymentControllerBase } from "./base/recurringPayment.controller.base";

@swagger.ApiTags("recurringPayments")
@common.Controller("recurringPayments")
export class RecurringPaymentController extends RecurringPaymentControllerBase {
  constructor(
    protected readonly service: RecurringPaymentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
