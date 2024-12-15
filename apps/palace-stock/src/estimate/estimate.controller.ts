import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EstimateService } from "./estimate.service";
import { EstimateControllerBase } from "./base/estimate.controller.base";

@swagger.ApiTags("estimates")
@common.Controller("estimates")
export class EstimateController extends EstimateControllerBase {
  constructor(
    protected readonly service: EstimateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
