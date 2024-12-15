import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CashSaleDetailModuleBase } from "./base/cashSaleDetail.module.base";
import { CashSaleDetailService } from "./cashSaleDetail.service";
import { CashSaleDetailController } from "./cashSaleDetail.controller";

@Module({
  imports: [CashSaleDetailModuleBase, forwardRef(() => AuthModule)],
  controllers: [CashSaleDetailController],
  providers: [CashSaleDetailService],
  exports: [CashSaleDetailService],
})
export class CashSaleDetailModule {}
