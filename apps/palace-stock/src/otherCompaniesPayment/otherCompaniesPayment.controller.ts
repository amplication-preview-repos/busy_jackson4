import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OtherCompaniesPaymentService } from "./otherCompaniesPayment.service";
import { OtherCompaniesPaymentControllerBase } from "./base/otherCompaniesPayment.controller.base";

@swagger.ApiTags("otherCompaniesPayments")
@common.Controller("otherCompaniesPayments")
export class OtherCompaniesPaymentController extends OtherCompaniesPaymentControllerBase {
  constructor(
    protected readonly service: OtherCompaniesPaymentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
