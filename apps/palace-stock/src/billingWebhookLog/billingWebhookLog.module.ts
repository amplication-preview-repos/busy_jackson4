import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingWebhookLogModuleBase } from "./base/billingWebhookLog.module.base";
import { BillingWebhookLogService } from "./billingWebhookLog.service";
import { BillingWebhookLogController } from "./billingWebhookLog.controller";

@Module({
  imports: [BillingWebhookLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingWebhookLogController],
  providers: [BillingWebhookLogService],
  exports: [BillingWebhookLogService],
})
export class BillingWebhookLogModule {}
