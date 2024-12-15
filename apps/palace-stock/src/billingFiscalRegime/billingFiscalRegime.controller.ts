import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingFiscalRegimeService } from "./billingFiscalRegime.service";
import { BillingFiscalRegimeControllerBase } from "./base/billingFiscalRegime.controller.base";

@swagger.ApiTags("billingFiscalRegimes")
@common.Controller("billingFiscalRegimes")
export class BillingFiscalRegimeController extends BillingFiscalRegimeControllerBase {
  constructor(
    protected readonly service: BillingFiscalRegimeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
