import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ItemPriceModuleBase } from "./base/itemPrice.module.base";
import { ItemPriceService } from "./itemPrice.service";
import { ItemPriceController } from "./itemPrice.controller";

@Module({
  imports: [ItemPriceModuleBase, forwardRef(() => AuthModule)],
  controllers: [ItemPriceController],
  providers: [ItemPriceService],
  exports: [ItemPriceService],
})
export class ItemPriceModule {}
