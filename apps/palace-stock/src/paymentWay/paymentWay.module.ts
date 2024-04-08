import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaymentWayModuleBase } from "./base/paymentWay.module.base";
import { PaymentWayService } from "./paymentWay.service";
import { PaymentWayController } from "./paymentWay.controller";

@Module({
  imports: [PaymentWayModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaymentWayController],
  providers: [PaymentWayService],
  exports: [PaymentWayService],
})
export class PaymentWayModule {}
