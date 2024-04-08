import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TransactionModuleBase } from "./base/transaction.module.base";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";

@Module({
  imports: [TransactionModuleBase, forwardRef(() => AuthModule)],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
