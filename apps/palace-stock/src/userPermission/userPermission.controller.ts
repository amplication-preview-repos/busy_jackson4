import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserPermissionService } from "./userPermission.service";
import { UserPermissionControllerBase } from "./base/userPermission.controller.base";

@swagger.ApiTags("userPermissions")
@common.Controller("userPermissions")
export class UserPermissionController extends UserPermissionControllerBase {
  constructor(
    protected readonly service: UserPermissionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
