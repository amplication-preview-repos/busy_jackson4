import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CollaboratorModuleBase } from "./base/collaborator.module.base";
import { CollaboratorService } from "./collaborator.service";
import { CollaboratorController } from "./collaborator.controller";

@Module({
  imports: [CollaboratorModuleBase, forwardRef(() => AuthModule)],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
