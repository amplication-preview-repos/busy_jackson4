import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NuovoHistoricalModuleBase } from "./base/nuovoHistorical.module.base";
import { NuovoHistoricalService } from "./nuovoHistorical.service";
import { NuovoHistoricalController } from "./nuovoHistorical.controller";

@Module({
  imports: [NuovoHistoricalModuleBase, forwardRef(() => AuthModule)],
  controllers: [NuovoHistoricalController],
  providers: [NuovoHistoricalService],
  exports: [NuovoHistoricalService],
})
export class NuovoHistoricalModule {}
