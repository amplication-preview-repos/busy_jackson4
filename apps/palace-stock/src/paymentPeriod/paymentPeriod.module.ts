import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaymentPeriodModuleBase } from "./base/paymentPeriod.module.base";
import { PaymentPeriodService } from "./paymentPeriod.service";
import { PaymentPeriodController } from "./paymentPeriod.controller";

@Module({
  imports: [PaymentPeriodModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaymentPeriodController],
  providers: [PaymentPeriodService],
  exports: [PaymentPeriodService],
})
export class PaymentPeriodModule {}
