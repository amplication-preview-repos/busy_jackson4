import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaycodeApiLogModuleBase } from "./base/paycodeApiLog.module.base";
import { PaycodeApiLogService } from "./paycodeApiLog.service";
import { PaycodeApiLogController } from "./paycodeApiLog.controller";

@Module({
  imports: [PaycodeApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaycodeApiLogController],
  providers: [PaycodeApiLogService],
  exports: [PaycodeApiLogService],
})
export class PaycodeApiLogModule {}
