import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingConceptCodeModuleBase } from "./base/billingConceptCode.module.base";
import { BillingConceptCodeService } from "./billingConceptCode.service";
import { BillingConceptCodeController } from "./billingConceptCode.controller";

@Module({
  imports: [BillingConceptCodeModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingConceptCodeController],
  providers: [BillingConceptCodeService],
  exports: [BillingConceptCodeService],
})
export class BillingConceptCodeModule {}
