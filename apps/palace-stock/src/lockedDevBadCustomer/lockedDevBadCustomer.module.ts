import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LockedDevBadCustomerModuleBase } from "./base/lockedDevBadCustomer.module.base";
import { LockedDevBadCustomerService } from "./lockedDevBadCustomer.service";
import { LockedDevBadCustomerController } from "./lockedDevBadCustomer.controller";

@Module({
  imports: [LockedDevBadCustomerModuleBase, forwardRef(() => AuthModule)],
  controllers: [LockedDevBadCustomerController],
  providers: [LockedDevBadCustomerService],
  exports: [LockedDevBadCustomerService],
})
export class LockedDevBadCustomerModule {}
