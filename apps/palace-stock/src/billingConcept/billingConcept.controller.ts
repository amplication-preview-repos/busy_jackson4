import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingConceptService } from "./billingConcept.service";
import { BillingConceptControllerBase } from "./base/billingConcept.controller.base";

@swagger.ApiTags("billingConcepts")
@common.Controller("billingConcepts")
export class BillingConceptController extends BillingConceptControllerBase {
  constructor(
    protected readonly service: BillingConceptService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
