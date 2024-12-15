import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaycodeWebhookLogModuleBase } from "./base/paycodeWebhookLog.module.base";
import { PaycodeWebhookLogService } from "./paycodeWebhookLog.service";
import { PaycodeWebhookLogController } from "./paycodeWebhookLog.controller";

@Module({
  imports: [PaycodeWebhookLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaycodeWebhookLogController],
  providers: [PaycodeWebhookLogService],
  exports: [PaycodeWebhookLogService],
})
export class PaycodeWebhookLogModule {}
