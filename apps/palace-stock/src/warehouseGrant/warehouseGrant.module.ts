import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WarehouseGrantModuleBase } from "./base/warehouseGrant.module.base";
import { WarehouseGrantService } from "./warehouseGrant.service";
import { WarehouseGrantController } from "./warehouseGrant.controller";

@Module({
  imports: [WarehouseGrantModuleBase, forwardRef(() => AuthModule)],
  controllers: [WarehouseGrantController],
  providers: [WarehouseGrantService],
  exports: [WarehouseGrantService],
})
export class WarehouseGrantModule {}
