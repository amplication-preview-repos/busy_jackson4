import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PaycodePaymentTransacModuleBase } from "./base/paycodePaymentTransac.module.base";
import { PaycodePaymentTransacService } from "./paycodePaymentTransac.service";
import { PaycodePaymentTransacController } from "./paycodePaymentTransac.controller";

@Module({
  imports: [PaycodePaymentTransacModuleBase, forwardRef(() => AuthModule)],
  controllers: [PaycodePaymentTransacController],
  providers: [PaycodePaymentTransacService],
  exports: [PaycodePaymentTransacService],
})
export class PaycodePaymentTransacModule {}
