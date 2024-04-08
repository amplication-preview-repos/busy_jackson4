import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ConektaWebhookLogModuleBase } from "./base/conektaWebhookLog.module.base";
import { ConektaWebhookLogService } from "./conektaWebhookLog.service";
import { ConektaWebhookLogController } from "./conektaWebhookLog.controller";

@Module({
  imports: [ConektaWebhookLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [ConektaWebhookLogController],
  providers: [ConektaWebhookLogService],
  exports: [ConektaWebhookLogService],
})
export class ConektaWebhookLogModule {}
