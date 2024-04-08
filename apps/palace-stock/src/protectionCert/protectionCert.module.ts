import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ProtectionCertModuleBase } from "./base/protectionCert.module.base";
import { ProtectionCertService } from "./protectionCert.service";
import { ProtectionCertController } from "./protectionCert.controller";

@Module({
  imports: [ProtectionCertModuleBase, forwardRef(() => AuthModule)],
  controllers: [ProtectionCertController],
  providers: [ProtectionCertService],
  exports: [ProtectionCertService],
})
export class ProtectionCertModule {}
