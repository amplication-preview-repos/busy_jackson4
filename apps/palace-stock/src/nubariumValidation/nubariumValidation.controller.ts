import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NubariumValidationService } from "./nubariumValidation.service";
import { NubariumValidationControllerBase } from "./base/nubariumValidation.controller.base";

@swagger.ApiTags("nubariumValidations")
@common.Controller("nubariumValidations")
export class NubariumValidationController extends NubariumValidationControllerBase {
  constructor(
    protected readonly service: NubariumValidationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
