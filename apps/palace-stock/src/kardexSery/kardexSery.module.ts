import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { KardexSeryModuleBase } from "./base/kardexSery.module.base";
import { KardexSeryService } from "./kardexSery.service";
import { KardexSeryController } from "./kardexSery.controller";

@Module({
  imports: [KardexSeryModuleBase, forwardRef(() => AuthModule)],
  controllers: [KardexSeryController],
  providers: [KardexSeryService],
  exports: [KardexSeryService],
})
export class KardexSeryModule {}
