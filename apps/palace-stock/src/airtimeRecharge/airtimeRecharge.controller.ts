import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AirtimeRechargeService } from "./airtimeRecharge.service";
import { AirtimeRechargeControllerBase } from "./base/airtimeRecharge.controller.base";

@swagger.ApiTags("airtimeRecharges")
@common.Controller("airtimeRecharges")
export class AirtimeRechargeController extends AirtimeRechargeControllerBase {
  constructor(
    protected readonly service: AirtimeRechargeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
