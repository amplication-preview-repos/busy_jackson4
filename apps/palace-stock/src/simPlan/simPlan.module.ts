import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SimPlanModuleBase } from "./base/simPlan.module.base";
import { SimPlanService } from "./simPlan.service";
import { SimPlanController } from "./simPlan.controller";

@Module({
  imports: [SimPlanModuleBase, forwardRef(() => AuthModule)],
  controllers: [SimPlanController],
  providers: [SimPlanService],
  exports: [SimPlanService],
})
export class SimPlanModule {}
