import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModelModuleBase } from "./base/userModel.module.base";
import { UserModelService } from "./userModel.service";
import { UserModelController } from "./userModel.controller";

@Module({
  imports: [UserModelModuleBase, forwardRef(() => AuthModule)],
  controllers: [UserModelController],
  providers: [UserModelService],
  exports: [UserModelService],
})
export class UserModelModule {}
