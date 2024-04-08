import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserQualityHistoryModuleBase } from "./base/userQualityHistory.module.base";
import { UserQualityHistoryService } from "./userQualityHistory.service";
import { UserQualityHistoryController } from "./userQualityHistory.controller";

@Module({
  imports: [UserQualityHistoryModuleBase, forwardRef(() => AuthModule)],
  controllers: [UserQualityHistoryController],
  providers: [UserQualityHistoryService],
  exports: [UserQualityHistoryService],
})
export class UserQualityHistoryModule {}
