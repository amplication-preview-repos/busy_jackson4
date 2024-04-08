import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TransacErrorModuleBase } from "./base/transacError.module.base";
import { TransacErrorService } from "./transacError.service";
import { TransacErrorController } from "./transacError.controller";

@Module({
  imports: [TransacErrorModuleBase, forwardRef(() => AuthModule)],
  controllers: [TransacErrorController],
  providers: [TransacErrorService],
  exports: [TransacErrorService],
})
export class TransacErrorModule {}
