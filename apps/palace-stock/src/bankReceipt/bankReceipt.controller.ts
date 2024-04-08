import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BankReceiptService } from "./bankReceipt.service";
import { BankReceiptControllerBase } from "./base/bankReceipt.controller.base";

@swagger.ApiTags("bankReceipts")
@common.Controller("bankReceipts")
export class BankReceiptController extends BankReceiptControllerBase {
  constructor(
    protected readonly service: BankReceiptService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
