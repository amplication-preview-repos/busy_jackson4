import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AngazaApiLogModuleBase } from "./base/angazaApiLog.module.base";
import { AngazaApiLogService } from "./angazaApiLog.service";
import { AngazaApiLogController } from "./angazaApiLog.controller";

@Module({
  imports: [AngazaApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [AngazaApiLogController],
  providers: [AngazaApiLogService],
  exports: [AngazaApiLogService],
})
export class AngazaApiLogModule {}
