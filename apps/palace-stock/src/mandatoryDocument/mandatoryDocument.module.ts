import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MandatoryDocumentModuleBase } from "./base/mandatoryDocument.module.base";
import { MandatoryDocumentService } from "./mandatoryDocument.service";
import { MandatoryDocumentController } from "./mandatoryDocument.controller";

@Module({
  imports: [MandatoryDocumentModuleBase, forwardRef(() => AuthModule)],
  controllers: [MandatoryDocumentController],
  providers: [MandatoryDocumentService],
  exports: [MandatoryDocumentService],
})
export class MandatoryDocumentModule {}
