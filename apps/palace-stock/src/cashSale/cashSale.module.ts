import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CashSaleModuleBase } from "./base/cashSale.module.base";
import { CashSaleService } from "./cashSale.service";
import { CashSaleController } from "./cashSale.controller";

@Module({
  imports: [CashSaleModuleBase, forwardRef(() => AuthModule)],
  controllers: [CashSaleController],
  providers: [CashSaleService],
  exports: [CashSaleService],
})
export class CashSaleModule {}
