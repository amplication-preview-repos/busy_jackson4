import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ModifiedPaymentService } from "./modifiedPayment.service";
import { ModifiedPaymentControllerBase } from "./base/modifiedPayment.controller.base";

@swagger.ApiTags("modifiedPayments")
@common.Controller("modifiedPayments")
export class ModifiedPaymentController extends ModifiedPaymentControllerBase {
  constructor(
    protected readonly service: ModifiedPaymentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
