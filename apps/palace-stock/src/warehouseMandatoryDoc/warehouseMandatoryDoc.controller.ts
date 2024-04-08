import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WarehouseMandatoryDocService } from "./warehouseMandatoryDoc.service";
import { WarehouseMandatoryDocControllerBase } from "./base/warehouseMandatoryDoc.controller.base";

@swagger.ApiTags("warehouseMandatoryDocs")
@common.Controller("warehouseMandatoryDocs")
export class WarehouseMandatoryDocController extends WarehouseMandatoryDocControllerBase {
  constructor(
    protected readonly service: WarehouseMandatoryDocService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
