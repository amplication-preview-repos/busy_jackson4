import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BranchManagerService } from "./branchManager.service";
import { BranchManagerControllerBase } from "./base/branchManager.controller.base";

@swagger.ApiTags("branchManagers")
@common.Controller("branchManagers")
export class BranchManagerController extends BranchManagerControllerBase {
  constructor(
    protected readonly service: BranchManagerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
