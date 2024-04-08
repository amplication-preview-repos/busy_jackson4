import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StockModuleBase } from "./base/stock.module.base";
import { StockService } from "./stock.service";
import { StockController } from "./stock.controller";

@Module({
  imports: [StockModuleBase, forwardRef(() => AuthModule)],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
