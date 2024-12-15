import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ModifiedSalesclerkModuleBase } from "./base/modifiedSalesclerk.module.base";
import { ModifiedSalesclerkService } from "./modifiedSalesclerk.service";
import { ModifiedSalesclerkController } from "./modifiedSalesclerk.controller";

@Module({
  imports: [ModifiedSalesclerkModuleBase, forwardRef(() => AuthModule)],
  controllers: [ModifiedSalesclerkController],
  providers: [ModifiedSalesclerkService],
  exports: [ModifiedSalesclerkService],
})
export class ModifiedSalesclerkModule {}
