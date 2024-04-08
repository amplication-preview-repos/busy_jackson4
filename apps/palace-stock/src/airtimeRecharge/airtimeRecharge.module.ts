import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AirtimeRechargeModuleBase } from "./base/airtimeRecharge.module.base";
import { AirtimeRechargeService } from "./airtimeRecharge.service";
import { AirtimeRechargeController } from "./airtimeRecharge.controller";

@Module({
  imports: [AirtimeRechargeModuleBase, forwardRef(() => AuthModule)],
  controllers: [AirtimeRechargeController],
  providers: [AirtimeRechargeService],
  exports: [AirtimeRechargeService],
})
export class AirtimeRechargeModule {}
