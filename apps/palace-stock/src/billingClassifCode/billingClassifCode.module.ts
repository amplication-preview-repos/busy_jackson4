import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingClassifCodeModuleBase } from "./base/billingClassifCode.module.base";
import { BillingClassifCodeService } from "./billingClassifCode.service";
import { BillingClassifCodeController } from "./billingClassifCode.controller";

@Module({
  imports: [BillingClassifCodeModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingClassifCodeController],
  providers: [BillingClassifCodeService],
  exports: [BillingClassifCodeService],
})
export class BillingClassifCodeModule {}
