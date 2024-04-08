import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillModuleBase } from "./base/bill.module.base";
import { BillService } from "./bill.service";
import { BillController } from "./bill.controller";

@Module({
  imports: [BillModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
