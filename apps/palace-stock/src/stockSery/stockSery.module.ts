import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StockSeryModuleBase } from "./base/stockSery.module.base";
import { StockSeryService } from "./stockSery.service";
import { StockSeryController } from "./stockSery.controller";

@Module({
  imports: [StockSeryModuleBase, forwardRef(() => AuthModule)],
  controllers: [StockSeryController],
  providers: [StockSeryService],
  exports: [StockSeryService],
})
export class StockSeryModule {}
