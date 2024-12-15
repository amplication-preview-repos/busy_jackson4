import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FinancedAccessoryService } from "./financedAccessory.service";
import { FinancedAccessoryControllerBase } from "./base/financedAccessory.controller.base";

@swagger.ApiTags("financedAccessories")
@common.Controller("financedAccessories")
export class FinancedAccessoryController extends FinancedAccessoryControllerBase {
  constructor(
    protected readonly service: FinancedAccessoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
