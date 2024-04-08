import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AngazaPaymentService } from "./angazaPayment.service";
import { AngazaPaymentControllerBase } from "./base/angazaPayment.controller.base";

@swagger.ApiTags("angazaPayments")
@common.Controller("angazaPayments")
export class AngazaPaymentController extends AngazaPaymentControllerBase {
  constructor(
    protected readonly service: AngazaPaymentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
