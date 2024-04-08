import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ItemModuleBase } from "./base/item.module.base";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";

@Module({
  imports: [ItemModuleBase, forwardRef(() => AuthModule)],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
