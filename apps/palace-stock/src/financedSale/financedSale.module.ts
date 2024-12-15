import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FinancedSaleModuleBase } from "./base/financedSale.module.base";
import { FinancedSaleService } from "./financedSale.service";
import { FinancedSaleController } from "./financedSale.controller";

@Module({
  imports: [FinancedSaleModuleBase, forwardRef(() => AuthModule)],
  controllers: [FinancedSaleController],
  providers: [FinancedSaleService],
  exports: [FinancedSaleService],
})
export class FinancedSaleModule {}
