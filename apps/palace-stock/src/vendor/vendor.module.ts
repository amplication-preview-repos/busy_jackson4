import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { VendorModuleBase } from "./base/vendor.module.base";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";

@Module({
  imports: [VendorModuleBase, forwardRef(() => AuthModule)],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
