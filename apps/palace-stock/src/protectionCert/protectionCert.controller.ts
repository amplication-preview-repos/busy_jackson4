import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProtectionCertService } from "./protectionCert.service";
import { ProtectionCertControllerBase } from "./base/protectionCert.controller.base";

@swagger.ApiTags("protectionCerts")
@common.Controller("protectionCerts")
export class ProtectionCertController extends ProtectionCertControllerBase {
  constructor(
    protected readonly service: ProtectionCertService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
