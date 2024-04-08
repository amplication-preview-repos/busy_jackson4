import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingSeryModuleBase } from "./base/billingSery.module.base";
import { BillingSeryService } from "./billingSery.service";
import { BillingSeryController } from "./billingSery.controller";

@Module({
  imports: [BillingSeryModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingSeryController],
  providers: [BillingSeryService],
  exports: [BillingSeryService],
})
export class BillingSeryModule {}
