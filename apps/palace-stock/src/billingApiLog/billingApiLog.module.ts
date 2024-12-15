import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingApiLogModuleBase } from "./base/billingApiLog.module.base";
import { BillingApiLogService } from "./billingApiLog.service";
import { BillingApiLogController } from "./billingApiLog.controller";

@Module({
  imports: [BillingApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingApiLogController],
  providers: [BillingApiLogService],
  exports: [BillingApiLogService],
})
export class BillingApiLogModule {}
