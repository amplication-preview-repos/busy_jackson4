import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingSeryService } from "./billingSery.service";
import { BillingSeryControllerBase } from "./base/billingSery.controller.base";

@swagger.ApiTags("billingSeries")
@common.Controller("billingSeries")
export class BillingSeryController extends BillingSeryControllerBase {
  constructor(
    protected readonly service: BillingSeryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
