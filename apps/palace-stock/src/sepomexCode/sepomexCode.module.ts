import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SepomexCodeModuleBase } from "./base/sepomexCode.module.base";
import { SepomexCodeService } from "./sepomexCode.service";
import { SepomexCodeController } from "./sepomexCode.controller";

@Module({
  imports: [SepomexCodeModuleBase, forwardRef(() => AuthModule)],
  controllers: [SepomexCodeController],
  providers: [SepomexCodeService],
  exports: [SepomexCodeService],
})
export class SepomexCodeModule {}
