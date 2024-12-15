import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ArticleToTagService } from "./articleToTag.service";
import { ArticleToTagControllerBase } from "./base/articleToTag.controller.base";

@swagger.ApiTags("articleToTags")
@common.Controller("articleToTags")
export class ArticleToTagController extends ArticleToTagControllerBase {
  constructor(
    protected readonly service: ArticleToTagService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
