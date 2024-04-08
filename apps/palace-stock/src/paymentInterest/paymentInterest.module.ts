import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaymentInterestModuleBase } from "./base/paymentInterest.module.base";
import { PaymentInterestService } from "./paymentInterest.service";
import { PaymentInterestController } from "./paymentInterest.controller";

@Module({
  imports: [PaymentInterestModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaymentInterestController],
  providers: [PaymentInterestService],
  exports: [PaymentInterestService],
})
export class PaymentInterestModule {}
