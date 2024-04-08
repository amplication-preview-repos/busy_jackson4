import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ConektaApiLogModuleBase } from "./base/conektaApiLog.module.base";
import { ConektaApiLogService } from "./conektaApiLog.service";
import { ConektaApiLogController } from "./conektaApiLog.controller";

@Module({
  imports: [ConektaApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [ConektaApiLogController],
  providers: [ConektaApiLogService],
  exports: [ConektaApiLogService],
})
export class ConektaApiLogModule {}
