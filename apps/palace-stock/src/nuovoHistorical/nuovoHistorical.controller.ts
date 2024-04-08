import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NuovoHistoricalService } from "./nuovoHistorical.service";
import { NuovoHistoricalControllerBase } from "./base/nuovoHistorical.controller.base";

@swagger.ApiTags("nuovoHistoricals")
@common.Controller("nuovoHistoricals")
export class NuovoHistoricalController extends NuovoHistoricalControllerBase {
  constructor(
    protected readonly service: NuovoHistoricalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
