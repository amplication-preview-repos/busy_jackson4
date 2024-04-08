import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AngazaAccountService } from "./angazaAccount.service";
import { AngazaAccountControllerBase } from "./base/angazaAccount.controller.base";

@swagger.ApiTags("angazaAccounts")
@common.Controller("angazaAccounts")
export class AngazaAccountController extends AngazaAccountControllerBase {
  constructor(
    protected readonly service: AngazaAccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
