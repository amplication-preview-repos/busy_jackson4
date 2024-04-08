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
import { BillingSatKeyService } from "../billingSatKey.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { BillingSatKeyCreateInput } from "./BillingSatKeyCreateInput";
import { BillingSatKey } from "./BillingSatKey";
import { BillingSatKeyFindManyArgs } from "./BillingSatKeyFindManyArgs";
import { BillingSatKeyWhereUniqueInput } from "./BillingSatKeyWhereUniqueInput";
import { BillingSatKeyUpdateInput } from "./BillingSatKeyUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class BillingSatKeyControllerBase {
  constructor(
    protected readonly service: BillingSatKeyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: BillingSatKey })
  @nestAccessControl.UseRoles({
    resource: "BillingSatKey",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createBillingSatKey(
    @common.Body() data: BillingSatKeyCreateInput
  ): Promise<BillingSatKey> {
    return await this.service.createBillingSatKey({
      data: data,
      select: {
        claveSatPs: true,
        descripcion: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [BillingSatKey] })
  @ApiNestedQuery(BillingSatKeyFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "BillingSatKey",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async billingSatKeys(
    @common.Req() request: Request
  ): Promise<BillingSatKey[]> {
    const args = plainToClass(BillingSatKeyFindManyArgs, request.query);
    return this.service.billingSatKeys({
      ...args,
      select: {
        claveSatPs: true,
        descripcion: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: BillingSatKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingSatKey",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async billingSatKey(
    @common.Param() params: BillingSatKeyWhereUniqueInput
  ): Promise<BillingSatKey | null> {
    const result = await this.service.billingSatKey({
      where: params,
      select: {
        claveSatPs: true,
        descripcion: true,
        id: true,
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
  @swagger.ApiOkResponse({ type: BillingSatKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingSatKey",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateBillingSatKey(
    @common.Param() params: BillingSatKeyWhereUniqueInput,
    @common.Body() data: BillingSatKeyUpdateInput
  ): Promise<BillingSatKey | null> {
    try {
      return await this.service.updateBillingSatKey({
        where: params,
        data: data,
        select: {
          claveSatPs: true,
          descripcion: true,
          id: true,
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
  @swagger.ApiOkResponse({ type: BillingSatKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingSatKey",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteBillingSatKey(
    @common.Param() params: BillingSatKeyWhereUniqueInput
  ): Promise<BillingSatKey | null> {
    try {
      return await this.service.deleteBillingSatKey({
        where: params,
        select: {
          claveSatPs: true,
          descripcion: true,
          id: true,
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
}