import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StripeWebhookLogModuleBase } from "./base/stripeWebhookLog.module.base";
import { StripeWebhookLogService } from "./stripeWebhookLog.service";
import { StripeWebhookLogController } from "./stripeWebhookLog.controller";

@Module({
  imports: [StripeWebhookLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [StripeWebhookLogController],
  providers: [StripeWebhookLogService],
  exports: [StripeWebhookLogService],
})
export class StripeWebhookLogModule {}
