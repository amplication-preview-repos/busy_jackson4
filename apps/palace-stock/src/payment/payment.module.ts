import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaymentModuleBase } from "./base/payment.module.base";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [PaymentModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
