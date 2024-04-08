import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingConceptCodeService } from "./billingConceptCode.service";
import { BillingConceptCodeControllerBase } from "./base/billingConceptCode.controller.base";

@swagger.ApiTags("billingConceptCodes")
@common.Controller("billingConceptCodes")
export class BillingConceptCodeController extends BillingConceptCodeControllerBase {
  constructor(
    protected readonly service: BillingConceptCodeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
