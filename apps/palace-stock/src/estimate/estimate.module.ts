import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { EstimateModuleBase } from "./base/estimate.module.base";
import { EstimateService } from "./estimate.service";
import { EstimateController } from "./estimate.controller";

@Module({
  imports: [EstimateModuleBase, forwardRef(() => AuthModule)],
  controllers: [EstimateController],
  providers: [EstimateService],
  exports: [EstimateService],
})
export class EstimateModule {}
