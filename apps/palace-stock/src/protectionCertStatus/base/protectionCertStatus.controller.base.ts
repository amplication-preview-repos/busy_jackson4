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
import { ProtectionCertStatusService } from "../protectionCertStatus.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ProtectionCertStatusCreateInput } from "./ProtectionCertStatusCreateInput";
import { ProtectionCertStatus } from "./ProtectionCertStatus";
import { ProtectionCertStatusFindManyArgs } from "./ProtectionCertStatusFindManyArgs";
import { ProtectionCertStatusWhereUniqueInput } from "./ProtectionCertStatusWhereUniqueInput";
import { ProtectionCertStatusUpdateInput } from "./ProtectionCertStatusUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ProtectionCertStatusControllerBase {
  constructor(
    protected readonly service: ProtectionCertStatusService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ProtectionCertStatus })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCertStatus",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createProtectionCertStatus(
    @common.Body() data: ProtectionCertStatusCreateInput
  ): Promise<ProtectionCertStatus> {
    return await this.service.createProtectionCertStatus({
      data: data,
      select: {
        descripEstatusCertProtec: true,
        estatusCertProtec: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [ProtectionCertStatus] })
  @ApiNestedQuery(ProtectionCertStatusFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ProtectionCertStatus",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async protectionCertStatuses(
    @common.Req() request: Request
  ): Promise<ProtectionCertStatus[]> {
    const args = plainToClass(ProtectionCertStatusFindManyArgs, request.query);
    return this.service.protectionCertStatuses({
      ...args,
      select: {
        descripEstatusCertProtec: true,
        estatusCertProtec: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ProtectionCertStatus })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCertStatus",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async protectionCertStatus(
    @common.Param() params: ProtectionCertStatusWhereUniqueInput
  ): Promise<ProtectionCertStatus | null> {
    const result = await this.service.protectionCertStatus({
      where: params,
      select: {
        descripEstatusCertProtec: true,
        estatusCertProtec: true,
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
  @swagger.ApiOkResponse({ type: ProtectionCertStatus })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCertStatus",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateProtectionCertStatus(
    @common.Param() params: ProtectionCertStatusWhereUniqueInput,
    @common.Body() data: ProtectionCertStatusUpdateInput
  ): Promise<ProtectionCertStatus | null> {
    try {
      return await this.service.updateProtectionCertStatus({
        where: params,
        data: data,
        select: {
          descripEstatusCertProtec: true,
          estatusCertProtec: true,
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
  @swagger.ApiOkResponse({ type: ProtectionCertStatus })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCertStatus",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteProtectionCertStatus(
    @common.Param() params: ProtectionCertStatusWhereUniqueInput
  ): Promise<ProtectionCertStatus | null> {
    try {
      return await this.service.deleteProtectionCertStatus({
        where: params,
        select: {
          descripEstatusCertProtec: true,
          estatusCertProtec: true,
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