import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NubariumOtherValidationService } from "./nubariumOtherValidation.service";
import { NubariumOtherValidationControllerBase } from "./base/nubariumOtherValidation.controller.base";

@swagger.ApiTags("nubariumOtherValidations")
@common.Controller("nubariumOtherValidations")
export class NubariumOtherValidationController extends NubariumOtherValidationControllerBase {
  constructor(
    protected readonly service: NubariumOtherValidationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
