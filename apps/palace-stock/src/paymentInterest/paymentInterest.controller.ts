import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentInterestService } from "./paymentInterest.service";
import { PaymentInterestControllerBase } from "./base/paymentInterest.controller.base";

@swagger.ApiTags("paymentInterests")
@common.Controller("paymentInterests")
export class PaymentInterestController extends PaymentInterestControllerBase {
  constructor(
    protected readonly service: PaymentInterestService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
