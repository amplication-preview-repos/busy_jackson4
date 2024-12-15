import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WarehouseLoanAmountModuleBase } from "./base/warehouseLoanAmount.module.base";
import { WarehouseLoanAmountService } from "./warehouseLoanAmount.service";
import { WarehouseLoanAmountController } from "./warehouseLoanAmount.controller";

@Module({
  imports: [WarehouseLoanAmountModuleBase, forwardRef(() => AuthModule)],
  controllers: [WarehouseLoanAmountController],
  providers: [WarehouseLoanAmountService],
  exports: [WarehouseLoanAmountService],
})
export class WarehouseLoanAmountModule {}
