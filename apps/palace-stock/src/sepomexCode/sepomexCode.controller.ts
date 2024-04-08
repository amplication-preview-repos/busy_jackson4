import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SepomexCodeService } from "./sepomexCode.service";
import { SepomexCodeControllerBase } from "./base/sepomexCode.controller.base";

@swagger.ApiTags("sepomexCodes")
@common.Controller("sepomexCodes")
export class SepomexCodeController extends SepomexCodeControllerBase {
  constructor(
    protected readonly service: SepomexCodeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
