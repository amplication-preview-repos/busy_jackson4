import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NuovoApiLogModuleBase } from "./base/nuovoApiLog.module.base";
import { NuovoApiLogService } from "./nuovoApiLog.service";
import { NuovoApiLogController } from "./nuovoApiLog.controller";

@Module({
  imports: [NuovoApiLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [NuovoApiLogController],
  providers: [NuovoApiLogService],
  exports: [NuovoApiLogService],
})
export class NuovoApiLogModule {}
