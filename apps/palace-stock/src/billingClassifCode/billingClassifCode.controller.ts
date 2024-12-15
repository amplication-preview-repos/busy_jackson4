import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingClassifCodeService } from "./billingClassifCode.service";
import { BillingClassifCodeControllerBase } from "./base/billingClassifCode.controller.base";

@swagger.ApiTags("billingClassifCodes")
@common.Controller("billingClassifCodes")
export class BillingClassifCodeController extends BillingClassifCodeControllerBase {
  constructor(
    protected readonly service: BillingClassifCodeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
