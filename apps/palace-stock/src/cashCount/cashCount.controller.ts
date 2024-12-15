import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CashCountService } from "./cashCount.service";
import { CashCountControllerBase } from "./base/cashCount.controller.base";

@swagger.ApiTags("cashCounts")
@common.Controller("cashCounts")
export class CashCountController extends CashCountControllerBase {
  constructor(
    protected readonly service: CashCountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
