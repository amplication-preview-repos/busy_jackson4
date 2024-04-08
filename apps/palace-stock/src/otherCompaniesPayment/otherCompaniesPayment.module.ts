import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { OtherCompaniesPaymentModuleBase } from "./base/otherCompaniesPayment.module.base";
import { OtherCompaniesPaymentService } from "./otherCompaniesPayment.service";
import { OtherCompaniesPaymentController } from "./otherCompaniesPayment.controller";

@Module({
  imports: [OtherCompaniesPaymentModuleBase, forwardRef(() => AuthModule)],
  controllers: [OtherCompaniesPaymentController],
  providers: [OtherCompaniesPaymentService],
  exports: [OtherCompaniesPaymentService],
})
export class OtherCompaniesPaymentModule {}
