import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingCfdiUsService } from "./billingCfdiUs.service";
import { BillingCfdiUsControllerBase } from "./base/billingCfdiUs.controller.base";

@swagger.ApiTags("billingCfdiuses")
@common.Controller("billingCfdiuses")
export class BillingCfdiUsController extends BillingCfdiUsControllerBase {
  constructor(
    protected readonly service: BillingCfdiUsService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
