import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StripePaymentTransacModuleBase } from "./base/stripePaymentTransac.module.base";
import { StripePaymentTransacService } from "./stripePaymentTransac.service";
import { StripePaymentTransacController } from "./stripePaymentTransac.controller";

@Module({
  imports: [StripePaymentTransacModuleBase, forwardRef(() => AuthModule)],
  controllers: [StripePaymentTransacController],
  providers: [StripePaymentTransacService],
  exports: [StripePaymentTransacService],
})
export class StripePaymentTransacModule {}
