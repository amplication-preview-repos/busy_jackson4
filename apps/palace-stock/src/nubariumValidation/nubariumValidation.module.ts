import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NubariumValidationModuleBase } from "./base/nubariumValidation.module.base";
import { NubariumValidationService } from "./nubariumValidation.service";
import { NubariumValidationController } from "./nubariumValidation.controller";

@Module({
  imports: [NubariumValidationModuleBase, forwardRef(() => AuthModule)],
  controllers: [NubariumValidationController],
  providers: [NubariumValidationService],
  exports: [NubariumValidationService],
})
export class NubariumValidationModule {}
