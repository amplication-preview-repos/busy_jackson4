import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AccessLevelService } from "./accessLevel.service";
import { AccessLevelControllerBase } from "./base/accessLevel.controller.base";

@swagger.ApiTags("accessLevels")
@common.Controller("accessLevels")
export class AccessLevelController extends AccessLevelControllerBase {
  constructor(
    protected readonly service: AccessLevelService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
