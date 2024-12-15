import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SimPlanService } from "./simPlan.service";
import { SimPlanControllerBase } from "./base/simPlan.controller.base";

@swagger.ApiTags("simPlans")
@common.Controller("simPlans")
export class SimPlanController extends SimPlanControllerBase {
  constructor(
    protected readonly service: SimPlanService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
