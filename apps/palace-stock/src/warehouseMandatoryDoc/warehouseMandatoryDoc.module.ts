import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WarehouseMandatoryDocModuleBase } from "./base/warehouseMandatoryDoc.module.base";
import { WarehouseMandatoryDocService } from "./warehouseMandatoryDoc.service";
import { WarehouseMandatoryDocController } from "./warehouseMandatoryDoc.controller";

@Module({
  imports: [WarehouseMandatoryDocModuleBase, forwardRef(() => AuthModule)],
  controllers: [WarehouseMandatoryDocController],
  providers: [WarehouseMandatoryDocService],
  exports: [WarehouseMandatoryDocService],
})
export class WarehouseMandatoryDocModule {}
