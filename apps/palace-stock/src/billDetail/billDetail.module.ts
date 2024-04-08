import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillDetailModuleBase } from "./base/billDetail.module.base";
import { BillDetailService } from "./billDetail.service";
import { BillDetailController } from "./billDetail.controller";

@Module({
  imports: [BillDetailModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillDetailController],
  providers: [BillDetailService],
  exports: [BillDetailService],
})
export class BillDetailModule {}
