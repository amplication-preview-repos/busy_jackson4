import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BranchOfficeModuleBase } from "./base/branchOffice.module.base";
import { BranchOfficeService } from "./branchOffice.service";
import { BranchOfficeController } from "./branchOffice.controller";

@Module({
  imports: [BranchOfficeModuleBase, forwardRef(() => AuthModule)],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService],
  exports: [BranchOfficeService],
})
export class BranchOfficeModule {}
