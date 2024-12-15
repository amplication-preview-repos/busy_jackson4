/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ArticleService } from "../article.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ArticleCreateInput } from "./ArticleCreateInput";
import { Article } from "./Article";
import { ArticleFindManyArgs } from "./ArticleFindManyArgs";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";
import { ArticleUpdateInput } from "./ArticleUpdateInput";
import { CommentFindManyArgs } from "../../comment/base/CommentFindManyArgs";
import { Comment } from "../../comment/base/Comment";
import { CommentWhereUniqueInput } from "../../comment/base/CommentWhereUniqueInput";
import { ArticleToTagFindManyArgs } from "../../articleToTag/base/ArticleToTagFindManyArgs";
import { ArticleToTag } from "../../articleToTag/base/ArticleToTag";
import { ArticleToTagWhereUniqueInput } from "../../articleToTag/base/ArticleToTagWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ArticleControllerBase {
  constructor(
    protected readonly service: ArticleService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Article })
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createArticle(
    @common.Body() data: ArticleCreateInput
  ): Promise<Article> {
    return await this.service.createArticle({
      data: data,
      select: {
        authorId: true,
        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Article] })
  @ApiNestedQuery(ArticleFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async articles(@common.Req() request: Request): Promise<Article[]> {
    const args = plainToClass(ArticleFindManyArgs, request.query);
    return this.service.articles({
      ...args,
      select: {
        authorId: true,
        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async article(
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<Article | null> {
    const result = await this.service.article({
      where: params,
      select: {
        authorId: true,
        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateArticle(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() data: ArticleUpdateInput
  ): Promise<Article | null> {
    try {
      return await this.service.updateArticle({
        where: params,
        data: data,
        select: {
          authorId: true,
          body: true,
          createdAt: true,
          description: true,
          favoritesCount: true,
          id: true,
          slug: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteArticle(
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<Article | null> {
    try {
      return await this.service.deleteArticle({
        where: params,
        select: {
          authorId: true,
          body: true,
          createdAt: true,
          description: true,
          favoritesCount: true,
          id: true,
          slug: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/comment")
  @ApiNestedQuery(CommentFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "read",
    possession: "any",
  })
  async findComment(
    @common.Req() request: Request,
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<Comment[]> {
    const query = plainToClass(CommentFindManyArgs, request.query);
    const results = await this.service.findComment(params.id, {
      ...query,
      select: {
        article: {
          select: {
            id: true,
          },
        },

        authorId: true,
        body: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/comment")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async connectComment(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: CommentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      comment: {
        connect: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/comment")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async updateComment(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: CommentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      comment: {
        set: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/comment")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async disconnectComment(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: CommentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      comment: {
        disconnect: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/tagList")
  @ApiNestedQuery(ArticleToTagFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ArticleToTag",
    action: "read",
    possession: "any",
  })
  async findTagList(
    @common.Req() request: Request,
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<ArticleToTag[]> {
    const query = plainToClass(ArticleToTagFindManyArgs, request.query);
    const results = await this.service.findTagList(params.id, {
      ...query,
      select: {
        article: {
          select: {
            id: true,
          },
        },

        id: true,

        tag: {
          select: {
            id: true,
          },
        },
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async connectTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleToTagWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tagList: {
        connect: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async updateTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleToTagWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tagList: {
        set: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async disconnectTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleToTagWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tagList: {
        disconnect: body,
      },
    };
    await this.service.updateArticle({
      where: params,
      data,
      select: { id: true },
    });
  }
}
