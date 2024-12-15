import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TransitTransferService } from "./transitTransfer.service";
import { TransitTransferControllerBase } from "./base/transitTransfer.controller.base";

@swagger.ApiTags("transitTransfers")
@common.Controller("transitTransfers")
export class TransitTransferController extends TransitTransferControllerBase {
  constructor(
    protected readonly service: TransitTransferService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
