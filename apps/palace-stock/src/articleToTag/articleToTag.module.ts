import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ArticleToTagModuleBase } from "./base/articleToTag.module.base";
import { ArticleToTagService } from "./articleToTag.service";
import { ArticleToTagController } from "./articleToTag.controller";

@Module({
  imports: [ArticleToTagModuleBase, forwardRef(() => AuthModule)],
  controllers: [ArticleToTagController],
  providers: [ArticleToTagService],
  exports: [ArticleToTagService],
})
export class ArticleToTagModule {}
