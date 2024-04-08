import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AngazaAccountModuleBase } from "./base/angazaAccount.module.base";
import { AngazaAccountService } from "./angazaAccount.service";
import { AngazaAccountController } from "./angazaAccount.controller";

@Module({
  imports: [AngazaAccountModuleBase, forwardRef(() => AuthModule)],
  controllers: [AngazaAccountController],
  providers: [AngazaAccountService],
  exports: [AngazaAccountService],
})
export class AngazaAccountModule {}
