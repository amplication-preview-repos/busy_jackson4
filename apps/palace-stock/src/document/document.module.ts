import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DocumentModuleBase } from "./base/document.module.base";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";

@Module({
  imports: [DocumentModuleBase, forwardRef(() => AuthModule)],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
