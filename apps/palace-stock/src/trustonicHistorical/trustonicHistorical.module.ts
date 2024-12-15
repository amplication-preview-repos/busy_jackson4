import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TrustonicHistoricalModuleBase } from "./base/trustonicHistorical.module.base";
import { TrustonicHistoricalService } from "./trustonicHistorical.service";
import { TrustonicHistoricalController } from "./trustonicHistorical.controller";

@Module({
  imports: [TrustonicHistoricalModuleBase, forwardRef(() => AuthModule)],
  controllers: [TrustonicHistoricalController],
  providers: [TrustonicHistoricalService],
  exports: [TrustonicHistoricalService],
})
export class TrustonicHistoricalModule {}
