import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ConektaPaymentTransacService } from "./conektaPaymentTransac.service";
import { ConektaPaymentTransacControllerBase } from "./base/conektaPaymentTransac.controller.base";

@swagger.ApiTags("conektaPaymentTransacs")
@common.Controller("conektaPaymentTransacs")
export class ConektaPaymentTransacController extends ConektaPaymentTransacControllerBase {
  constructor(
    protected readonly service: ConektaPaymentTransacService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
