import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ComunApiLogModuleBase } from "./base/comunApiLog.module.base";
import { ComunApiLogService } from "./comunApiLog.service";
import { ComunApiLogController } from "./comunApiLog.controller";

@Module({
  imports: [ComunApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [ComunApiLogController],
  providers: [ComunApiLogService],
  exports: [ComunApiLogService],
})
export class ComunApiLogModule {}
