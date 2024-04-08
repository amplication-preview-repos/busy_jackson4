import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { KardexModuleBase } from "./base/kardex.module.base";
import { KardexService } from "./kardex.service";
import { KardexController } from "./kardex.controller";

@Module({
  imports: [KardexModuleBase, forwardRef(() => AuthModule)],
  controllers: [KardexController],
  providers: [KardexService],
  exports: [KardexService],
})
export class KardexModule {}
