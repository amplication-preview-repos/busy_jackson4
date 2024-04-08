import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CashCountDetailModuleBase } from "./base/cashCountDetail.module.base";
import { CashCountDetailService } from "./cashCountDetail.service";
import { CashCountDetailController } from "./cashCountDetail.controller";

@Module({
  imports: [CashCountDetailModuleBase, forwardRef(() => AuthModule)],
  controllers: [CashCountDetailController],
  providers: [CashCountDetailService],
  exports: [CashCountDetailService],
})
export class CashCountDetailModule {}
