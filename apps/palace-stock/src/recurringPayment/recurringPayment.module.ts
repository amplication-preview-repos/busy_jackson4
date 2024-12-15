import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RecurringPaymentModuleBase } from "./base/recurringPayment.module.base";
import { RecurringPaymentService } from "./recurringPayment.service";
import { RecurringPaymentController } from "./recurringPayment.controller";

@Module({
  imports: [RecurringPaymentModuleBase, forwardRef(() => AuthModule)],
  controllers: [RecurringPaymentController],
  providers: [RecurringPaymentService],
  exports: [RecurringPaymentService],
})
export class RecurringPaymentModule {}
