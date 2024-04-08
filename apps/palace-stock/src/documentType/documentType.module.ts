import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DocumentTypeModuleBase } from "./base/documentType.module.base";
import { DocumentTypeService } from "./documentType.service";
import { DocumentTypeController } from "./documentType.controller";

@Module({
  imports: [DocumentTypeModuleBase, forwardRef(() => AuthModule)],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  exports: [DocumentTypeService],
})
export class DocumentTypeModule {}
