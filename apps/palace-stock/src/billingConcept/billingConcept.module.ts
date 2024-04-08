import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingConceptModuleBase } from "./base/billingConcept.module.base";
import { BillingConceptService } from "./billingConcept.service";
import { BillingConceptController } from "./billingConcept.controller";

@Module({
  imports: [BillingConceptModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingConceptController],
  providers: [BillingConceptService],
  exports: [BillingConceptService],
})
export class BillingConceptModule {}
