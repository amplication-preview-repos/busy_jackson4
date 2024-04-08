import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WimotelecomApiLogModuleBase } from "./base/wimotelecomApiLog.module.base";
import { WimotelecomApiLogService } from "./wimotelecomApiLog.service";
import { WimotelecomApiLogController } from "./wimotelecomApiLog.controller";

@Module({
  imports: [WimotelecomApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [WimotelecomApiLogController],
  providers: [WimotelecomApiLogService],
  exports: [WimotelecomApiLogService],
})
export class WimotelecomApiLogModule {}
