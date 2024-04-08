import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SmsMasivosApiLogModuleBase } from "./base/smsMasivosApiLog.module.base";
import { SmsMasivosApiLogService } from "./smsMasivosApiLog.service";
import { SmsMasivosApiLogController } from "./smsMasivosApiLog.controller";

@Module({
  imports: [SmsMasivosApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [SmsMasivosApiLogController],
  providers: [SmsMasivosApiLogService],
  exports: [SmsMasivosApiLogService],
})
export class SmsMasivosApiLogModule {}
