import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LoanAmountModuleBase } from "./base/loanAmount.module.base";
import { LoanAmountService } from "./loanAmount.service";
import { LoanAmountController } from "./loanAmount.controller";

@Module({
  imports: [LoanAmountModuleBase, forwardRef(() => AuthModule)],
  controllers: [LoanAmountController],
  providers: [LoanAmountService],
  exports: [LoanAmountService],
})
export class LoanAmountModule {}
