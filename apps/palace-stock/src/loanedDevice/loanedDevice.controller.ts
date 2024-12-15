import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LoanedDeviceService } from "./loanedDevice.service";
import { LoanedDeviceControllerBase } from "./base/loanedDevice.controller.base";

@swagger.ApiTags("loanedDevices")
@common.Controller("loanedDevices")
export class LoanedDeviceController extends LoanedDeviceControllerBase {
  constructor(
    protected readonly service: LoanedDeviceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
