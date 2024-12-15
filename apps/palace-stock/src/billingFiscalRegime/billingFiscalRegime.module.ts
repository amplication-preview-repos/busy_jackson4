import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingFiscalRegimeModuleBase } from "./base/billingFiscalRegime.module.base";
import { BillingFiscalRegimeService } from "./billingFiscalRegime.service";
import { BillingFiscalRegimeController } from "./billingFiscalRegime.controller";

@Module({
  imports: [BillingFiscalRegimeModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingFiscalRegimeController],
  providers: [BillingFiscalRegimeService],
  exports: [BillingFiscalRegimeService],
})
export class BillingFiscalRegimeModule {}
