import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaycodePaymentTransacService } from "./paycodePaymentTransac.service";
import { PaycodePaymentTransacControllerBase } from "./base/paycodePaymentTransac.controller.base";

@swagger.ApiTags("paycodePaymentTransacs")
@common.Controller("paycodePaymentTransacs")
export class PaycodePaymentTransacController extends PaycodePaymentTransacControllerBase {
  constructor(
    protected readonly service: PaycodePaymentTransacService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
