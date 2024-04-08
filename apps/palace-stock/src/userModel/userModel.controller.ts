import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserModelService } from "./userModel.service";
import { UserModelControllerBase } from "./base/userModel.controller.base";

@swagger.ApiTags("userModels")
@common.Controller("userModels")
export class UserModelController extends UserModelControllerBase {
  constructor(
    protected readonly service: UserModelService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
