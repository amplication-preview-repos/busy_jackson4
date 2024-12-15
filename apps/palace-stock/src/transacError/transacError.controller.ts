import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TransacErrorService } from "./transacError.service";
import { TransacErrorControllerBase } from "./base/transacError.controller.base";

@swagger.ApiTags("transacErrors")
@common.Controller("transacErrors")
export class TransacErrorController extends TransacErrorControllerBase {
  constructor(
    protected readonly service: TransacErrorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
