import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AngazaPaymentModuleBase } from "./base/angazaPayment.module.base";
import { AngazaPaymentService } from "./angazaPayment.service";
import { AngazaPaymentController } from "./angazaPayment.controller";

@Module({
  imports: [AngazaPaymentModuleBase, forwardRef(() => AuthModule)],
  controllers: [AngazaPaymentController],
  providers: [AngazaPaymentService],
  exports: [AngazaPaymentService],
})
export class AngazaPaymentModule {}
