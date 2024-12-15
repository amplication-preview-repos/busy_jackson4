import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PurchaseModuleBase } from "./base/purchase.module.base";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";

@Module({
  imports: [PurchaseModuleBase, forwardRef(() => AuthModule)],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
