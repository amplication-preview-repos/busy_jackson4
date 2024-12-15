import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LoanedDeviceModuleBase } from "./base/loanedDevice.module.base";
import { LoanedDeviceService } from "./loanedDevice.service";
import { LoanedDeviceController } from "./loanedDevice.controller";

@Module({
  imports: [LoanedDeviceModuleBase, forwardRef(() => AuthModule)],
  controllers: [LoanedDeviceController],
  providers: [LoanedDeviceService],
  exports: [LoanedDeviceService],
})
export class LoanedDeviceModule {}
