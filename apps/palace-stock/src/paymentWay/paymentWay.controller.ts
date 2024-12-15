import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentWayService } from "./paymentWay.service";
import { PaymentWayControllerBase } from "./base/paymentWay.controller.base";

@swagger.ApiTags("paymentWays")
@common.Controller("paymentWays")
export class PaymentWayController extends PaymentWayControllerBase {
  constructor(
    protected readonly service: PaymentWayService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
