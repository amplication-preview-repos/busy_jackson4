import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LockedDevBadCustomerService } from "./lockedDevBadCustomer.service";
import { LockedDevBadCustomerControllerBase } from "./base/lockedDevBadCustomer.controller.base";

@swagger.ApiTags("lockedDevBadCustomers")
@common.Controller("lockedDevBadCustomers")
export class LockedDevBadCustomerController extends LockedDevBadCustomerControllerBase {
  constructor(
    protected readonly service: LockedDevBadCustomerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
