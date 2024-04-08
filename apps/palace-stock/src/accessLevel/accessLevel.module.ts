import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AccessLevelModuleBase } from "./base/accessLevel.module.base";
import { AccessLevelService } from "./accessLevel.service";
import { AccessLevelController } from "./accessLevel.controller";

@Module({
  imports: [AccessLevelModuleBase, forwardRef(() => AuthModule)],
  controllers: [AccessLevelController],
  providers: [AccessLevelService],
  exports: [AccessLevelService],
})
export class AccessLevelModule {}
