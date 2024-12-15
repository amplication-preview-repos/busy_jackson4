import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillDetailService } from "./billDetail.service";
import { BillDetailControllerBase } from "./base/billDetail.controller.base";

@swagger.ApiTags("billDetails")
@common.Controller("billDetails")
export class BillDetailController extends BillDetailControllerBase {
  constructor(
    protected readonly service: BillDetailService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
