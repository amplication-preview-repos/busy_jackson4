import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ModifiedPaymentModuleBase } from "./base/modifiedPayment.module.base";
import { ModifiedPaymentService } from "./modifiedPayment.service";
import { ModifiedPaymentController } from "./modifiedPayment.controller";

@Module({
  imports: [ModifiedPaymentModuleBase, forwardRef(() => AuthModule)],
  controllers: [ModifiedPaymentController],
  providers: [ModifiedPaymentService],
  exports: [ModifiedPaymentService],
})
export class ModifiedPaymentModule {}
