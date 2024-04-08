import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ModifiedPermissionService } from "./modifiedPermission.service";
import { ModifiedPermissionControllerBase } from "./base/modifiedPermission.controller.base";

@swagger.ApiTags("modifiedPermissions")
@common.Controller("modifiedPermissions")
export class ModifiedPermissionController extends ModifiedPermissionControllerBase {
  constructor(
    protected readonly service: ModifiedPermissionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
