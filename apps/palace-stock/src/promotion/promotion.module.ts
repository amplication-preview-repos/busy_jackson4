import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PromotionModuleBase } from "./base/promotion.module.base";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";

@Module({
  imports: [PromotionModuleBase, forwardRef(() => AuthModule)],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
