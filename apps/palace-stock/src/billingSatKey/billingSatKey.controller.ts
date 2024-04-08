import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BillingSatKeyService } from "./billingSatKey.service";
import { BillingSatKeyControllerBase } from "./base/billingSatKey.controller.base";

@swagger.ApiTags("billingSatKeys")
@common.Controller("billingSatKeys")
export class BillingSatKeyController extends BillingSatKeyControllerBase {
  constructor(
    protected readonly service: BillingSatKeyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
