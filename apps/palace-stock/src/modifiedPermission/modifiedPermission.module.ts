import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ModifiedPermissionModuleBase } from "./base/modifiedPermission.module.base";
import { ModifiedPermissionService } from "./modifiedPermission.service";
import { ModifiedPermissionController } from "./modifiedPermission.controller";

@Module({
  imports: [ModifiedPermissionModuleBase, forwardRef(() => AuthModule)],
  controllers: [ModifiedPermissionController],
  providers: [ModifiedPermissionService],
  exports: [ModifiedPermissionService],
})
export class ModifiedPermissionModule {}
