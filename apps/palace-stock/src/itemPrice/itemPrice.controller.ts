import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ItemPriceService } from "./itemPrice.service";
import { ItemPriceControllerBase } from "./base/itemPrice.controller.base";

@swagger.ApiTags("itemPrices")
@common.Controller("itemPrices")
export class ItemPriceController extends ItemPriceControllerBase {
  constructor(
    protected readonly service: ItemPriceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
