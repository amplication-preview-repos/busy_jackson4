import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PersonalLoanModuleBase } from "./base/personalLoan.module.base";
import { PersonalLoanService } from "./personalLoan.service";
import { PersonalLoanController } from "./personalLoan.controller";

@Module({
  imports: [PersonalLoanModuleBase, forwardRef(() => AuthModule)],
  controllers: [PersonalLoanController],
  providers: [PersonalLoanService],
  exports: [PersonalLoanService],
})
export class PersonalLoanModule {}
