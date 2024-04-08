import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BankReceiptModuleBase } from "./base/bankReceipt.module.base";
import { BankReceiptService } from "./bankReceipt.service";
import { BankReceiptController } from "./bankReceipt.controller";

@Module({
  imports: [BankReceiptModuleBase, forwardRef(() => AuthModule)],
  controllers: [BankReceiptController],
  providers: [BankReceiptService],
  exports: [BankReceiptService],
})
export class BankReceiptModule {}
