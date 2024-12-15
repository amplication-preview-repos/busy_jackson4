import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TrustonicApiLogModuleBase } from "./base/trustonicApiLog.module.base";
import { TrustonicApiLogService } from "./trustonicApiLog.service";
import { TrustonicApiLogController } from "./trustonicApiLog.controller";

@Module({
  imports: [TrustonicApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [TrustonicApiLogController],
  providers: [TrustonicApiLogService],
  exports: [TrustonicApiLogService],
})
export class TrustonicApiLogModule {}
