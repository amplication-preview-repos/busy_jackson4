import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StripeApiLogModuleBase } from "./base/stripeApiLog.module.base";
import { StripeApiLogService } from "./stripeApiLog.service";
import { StripeApiLogController } from "./stripeApiLog.controller";

@Module({
  imports: [StripeApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [StripeApiLogController],
  providers: [StripeApiLogService],
  exports: [StripeApiLogService],
})
export class StripeApiLogModule {}
