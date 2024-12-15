import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CashCountModuleBase } from "./base/cashCount.module.base";
import { CashCountService } from "./cashCount.service";
import { CashCountController } from "./cashCount.controller";

@Module({
  imports: [CashCountModuleBase, forwardRef(() => AuthModule)],
  controllers: [CashCountController],
  providers: [CashCountService],
  exports: [CashCountService],
})
export class CashCountModule {}
