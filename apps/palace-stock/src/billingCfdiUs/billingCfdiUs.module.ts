import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingCfdiUsModuleBase } from "./base/billingCfdiUs.module.base";
import { BillingCfdiUsService } from "./billingCfdiUs.service";
import { BillingCfdiUsController } from "./billingCfdiUs.controller";

@Module({
  imports: [BillingCfdiUsModuleBase, forwardRef(() => AuthModule)],
  controllers: [BillingCfdiUsController],
  providers: [BillingCfdiUsService],
  exports: [BillingCfdiUsService],
})
export class BillingCfdiUsModule {}
