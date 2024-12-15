import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NubariumValidationsLogModuleBase } from "./base/nubariumValidationsLog.module.base";
import { NubariumValidationsLogService } from "./nubariumValidationsLog.service";
import { NubariumValidationsLogController } from "./nubariumValidationsLog.controller";

@Module({
  imports: [NubariumValidationsLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [NubariumValidationsLogController],
  providers: [NubariumValidationsLogService],
  exports: [NubariumValidationsLogService],
})
export class NubariumValidationsLogModule {}
