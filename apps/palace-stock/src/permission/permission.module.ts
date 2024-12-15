import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PermissionModuleBase } from "./base/permission.module.base";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";

@Module({
  imports: [PermissionModuleBase, forwardRef(() => AuthModule)],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
