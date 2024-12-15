import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NubariumOtherValidationModuleBase } from "./base/nubariumOtherValidation.module.base";
import { NubariumOtherValidationService } from "./nubariumOtherValidation.service";
import { NubariumOtherValidationController } from "./nubariumOtherValidation.controller";

@Module({
  imports: [NubariumOtherValidationModuleBase, forwardRef(() => AuthModule)],
  controllers: [NubariumOtherValidationController],
  providers: [NubariumOtherValidationService],
  exports: [NubariumOtherValidationService],
})
export class NubariumOtherValidationModule {}
