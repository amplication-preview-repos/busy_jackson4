import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BranchOfficeService } from "./branchOffice.service";
import { BranchOfficeControllerBase } from "./base/branchOffice.controller.base";

@swagger.ApiTags("branchOffices")
@common.Controller("branchOffices")
export class BranchOfficeController extends BranchOfficeControllerBase {
  constructor(
    protected readonly service: BranchOfficeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
