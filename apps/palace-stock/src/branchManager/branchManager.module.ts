import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BranchManagerModuleBase } from "./base/branchManager.module.base";
import { BranchManagerService } from "./branchManager.service";
import { BranchManagerController } from "./branchManager.controller";

@Module({
  imports: [BranchManagerModuleBase, forwardRef(() => AuthModule)],
  controllers: [BranchManagerController],
  providers: [BranchManagerService],
  exports: [BranchManagerService],
})
export class BranchManagerModule {}
