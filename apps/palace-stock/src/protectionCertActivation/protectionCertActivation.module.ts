import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ProtectionCertActivationModuleBase } from "./base/protectionCertActivation.module.base";
import { ProtectionCertActivationService } from "./protectionCertActivation.service";
import { ProtectionCertActivationController } from "./protectionCertActivation.controller";

@Module({
  imports: [ProtectionCertActivationModuleBase, forwardRef(() => AuthModule)],
  controllers: [ProtectionCertActivationController],
  providers: [ProtectionCertActivationService],
  exports: [ProtectionCertActivationService],
})
export class ProtectionCertActivationModule {}
