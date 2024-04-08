import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProtectionCertActivationService } from "./protectionCertActivation.service";
import { ProtectionCertActivationControllerBase } from "./base/protectionCertActivation.controller.base";

@swagger.ApiTags("protectionCertActivations")
@common.Controller("protectionCertActivations")
export class ProtectionCertActivationController extends ProtectionCertActivationControllerBase {
  constructor(
    protected readonly service: ProtectionCertActivationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
