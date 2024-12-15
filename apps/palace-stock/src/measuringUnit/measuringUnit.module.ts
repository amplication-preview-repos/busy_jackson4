import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MeasuringUnitModuleBase } from "./base/measuringUnit.module.base";
import { MeasuringUnitService } from "./measuringUnit.service";
import { MeasuringUnitController } from "./measuringUnit.controller";

@Module({
  imports: [MeasuringUnitModuleBase, forwardRef(() => AuthModule)],
  controllers: [MeasuringUnitController],
  providers: [MeasuringUnitService],
  exports: [MeasuringUnitService],
})
export class MeasuringUnitModule {}
