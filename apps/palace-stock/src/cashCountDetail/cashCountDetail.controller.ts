import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CashCountDetailService } from "./cashCountDetail.service";
import { CashCountDetailControllerBase } from "./base/cashCountDetail.controller.base";

@swagger.ApiTags("cashCountDetails")
@common.Controller("cashCountDetails")
export class CashCountDetailController extends CashCountDetailControllerBase {
  constructor(
    protected readonly service: CashCountDetailService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
