import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TrustonicHistoricalService } from "./trustonicHistorical.service";
import { TrustonicHistoricalControllerBase } from "./base/trustonicHistorical.controller.base";

@swagger.ApiTags("trustonicHistoricals")
@common.Controller("trustonicHistoricals")
export class TrustonicHistoricalController extends TrustonicHistoricalControllerBase {
  constructor(
    protected readonly service: TrustonicHistoricalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
