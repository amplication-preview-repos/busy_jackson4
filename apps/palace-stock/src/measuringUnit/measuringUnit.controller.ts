import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MeasuringUnitService } from "./measuringUnit.service";
import { MeasuringUnitControllerBase } from "./base/measuringUnit.controller.base";

@swagger.ApiTags("measuringUnits")
@common.Controller("measuringUnits")
export class MeasuringUnitController extends MeasuringUnitControllerBase {
  constructor(
    protected readonly service: MeasuringUnitService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
