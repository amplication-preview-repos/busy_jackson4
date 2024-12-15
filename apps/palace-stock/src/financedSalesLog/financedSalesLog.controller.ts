import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FinancedSalesLogService } from "./financedSalesLog.service";
import { FinancedSalesLogControllerBase } from "./base/financedSalesLog.controller.base";

@swagger.ApiTags("financedSalesLogs")
@common.Controller("financedSalesLogs")
export class FinancedSalesLogController extends FinancedSalesLogControllerBase {
  constructor(
    protected readonly service: FinancedSalesLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
