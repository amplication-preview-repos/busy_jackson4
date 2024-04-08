import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingSatKeyModuleBase } from "./base/billingSatKey.module.base";
import { BillingSatKeyService } from "./billingSatKey.service";
import { BillingSatKeyController } from "./billingSatKey.controller";

@Module({
  imports: [BillingSatKeyModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingSatKeyController],
  providers: [BillingSatKeyService],
  exports: [BillingSatKeyService],
})
export class BillingSatKeyModule {}
