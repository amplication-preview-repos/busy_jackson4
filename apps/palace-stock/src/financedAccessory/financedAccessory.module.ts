import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FinancedAccessoryModuleBase } from "./base/financedAccessory.module.base";
import { FinancedAccessoryService } from "./financedAccessory.service";
import { FinancedAccessoryController } from "./financedAccessory.controller";

@Module({
  imports: [FinancedAccessoryModuleBase, forwardRef(() => AuthModule)],
  controllers: [FinancedAccessoryController],
  providers: [FinancedAccessoryService],
  exports: [FinancedAccessoryService],
})
export class FinancedAccessoryModule {}
