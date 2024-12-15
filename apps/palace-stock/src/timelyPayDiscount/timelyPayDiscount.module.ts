import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TimelyPayDiscountModuleBase } from "./base/timelyPayDiscount.module.base";
import { TimelyPayDiscountService } from "./timelyPayDiscount.service";
import { TimelyPayDiscountController } from "./timelyPayDiscount.controller";

@Module({
  imports: [TimelyPayDiscountModuleBase, forwardRef(() => AuthModule)],
  controllers: [TimelyPayDiscountController],
  providers: [TimelyPayDiscountService],
  exports: [TimelyPayDiscountService],
})
export class TimelyPayDiscountModule {}
