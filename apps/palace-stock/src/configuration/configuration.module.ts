import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ConfigurationModuleBase } from "./base/configuration.module.base";
import { ConfigurationService } from "./configuration.service";
import { ConfigurationController } from "./configuration.controller";

@Module({
  imports: [ConfigurationModuleBase, forwardRef(() => AuthModule)],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
