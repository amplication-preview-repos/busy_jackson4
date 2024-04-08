import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserQualityHistoryService } from "./userQualityHistory.service";
import { UserQualityHistoryControllerBase } from "./base/userQualityHistory.controller.base";

@swagger.ApiTags("userQualityHistories")
@common.Controller("userQualityHistories")
export class UserQualityHistoryController extends UserQualityHistoryControllerBase {
  constructor(
    protected readonly service: UserQualityHistoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
