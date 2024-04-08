import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TransitTransferModuleBase } from "./base/transitTransfer.module.base";
import { TransitTransferService } from "./transitTransfer.service";
import { TransitTransferController } from "./transitTransfer.controller";

@Module({
  imports: [TransitTransferModuleBase, forwardRef(() => AuthModule)],
  controllers: [TransitTransferController],
  providers: [TransitTransferService],
  exports: [TransitTransferService],
})
export class TransitTransferModule {}
