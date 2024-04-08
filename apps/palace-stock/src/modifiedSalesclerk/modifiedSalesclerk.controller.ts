import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ModifiedSalesclerkService } from "./modifiedSalesclerk.service";
import { ModifiedSalesclerkControllerBase } from "./base/modifiedSalesclerk.controller.base";

@swagger.ApiTags("modifiedSalesclerks")
@common.Controller("modifiedSalesclerks")
export class ModifiedSalesclerkController extends ModifiedSalesclerkControllerBase {
  constructor(
    protected readonly service: ModifiedSalesclerkService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
