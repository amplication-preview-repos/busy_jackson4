import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FinancedSalesLogModuleBase } from "./base/financedSalesLog.module.base";
import { FinancedSalesLogService } from "./financedSalesLog.service";
import { FinancedSalesLogController } from "./financedSalesLog.controller";

@Module({
  imports: [FinancedSalesLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [FinancedSalesLogController],
  providers: [FinancedSalesLogService],
  exports: [FinancedSalesLogService],
})
export class FinancedSalesLogModule {}
