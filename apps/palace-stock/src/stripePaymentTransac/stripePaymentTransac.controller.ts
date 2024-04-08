import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StripePaymentTransacService } from "./stripePaymentTransac.service";
import { StripePaymentTransacControllerBase } from "./base/stripePaymentTransac.controller.base";

@swagger.ApiTags("stripePaymentTransacs")
@common.Controller("stripePaymentTransacs")
export class StripePaymentTransacController extends StripePaymentTransacControllerBase {
  constructor(
    protected readonly service: StripePaymentTransacService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
