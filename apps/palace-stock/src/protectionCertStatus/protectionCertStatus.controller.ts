import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProtectionCertStatusService } from "./protectionCertStatus.service";
import { ProtectionCertStatusControllerBase } from "./base/protectionCertStatus.controller.base";

@swagger.ApiTags("protectionCertStatuses")
@common.Controller("protectionCertStatuses")
export class ProtectionCertStatusController extends ProtectionCertStatusControllerBase {
  constructor(
    protected readonly service: ProtectionCertStatusService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
