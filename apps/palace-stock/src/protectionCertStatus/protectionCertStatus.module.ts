import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ProtectionCertStatusModuleBase } from "./base/protectionCertStatus.module.base";
import { ProtectionCertStatusService } from "./protectionCertStatus.service";
import { ProtectionCertStatusController } from "./protectionCertStatus.controller";

@Module({
  imports: [ProtectionCertStatusModuleBase, forwardRef(() => AuthModule)],
  controllers: [ProtectionCertStatusController],
  providers: [ProtectionCertStatusService],
  exports: [ProtectionCertStatusService],
})
export class ProtectionCertStatusModule {}
