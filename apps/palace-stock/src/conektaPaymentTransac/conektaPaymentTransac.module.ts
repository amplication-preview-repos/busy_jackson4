import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ConektaPaymentTransacModuleBase } from "./base/conektaPaymentTransac.module.base";
import { ConektaPaymentTransacService } from "./conektaPaymentTransac.service";
import { ConektaPaymentTransacController } from "./conektaPaymentTransac.controller";

@Module({
  imports: [ConektaPaymentTransacModuleBase, forwardRef(() => AuthModule)],
  controllers: [ConektaPaymentTransacController],
  providers: [ConektaPaymentTransacService],
  exports: [ConektaPaymentTransacService],
})
export class ConektaPaymentTransacModule {}
