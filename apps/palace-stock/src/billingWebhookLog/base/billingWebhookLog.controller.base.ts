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
import { BillingWebhookLogService } from "../billingWebhookLog.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { BillingWebhookLogCreateInput } from "./BillingWebhookLogCreateInput";
import { BillingWebhookLog } from "./BillingWebhookLog";
import { BillingWebhookLogFindManyArgs } from "./BillingWebhookLogFindManyArgs";
import { BillingWebhookLogWhereUniqueInput } from "./BillingWebhookLogWhereUniqueInput";
import { BillingWebhookLogUpdateInput } from "./BillingWebhookLogUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class BillingWebhookLogControllerBase {
  constructor(
    protected readonly service: BillingWebhookLogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: BillingWebhookLog })
  @nestAccessControl.UseRoles({
    resource: "BillingWebhookLog",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createBillingWebhookLog(
    @common.Body() data: BillingWebhookLogCreateInput
  ): Promise<BillingWebhookLog> {
    return await this.service.createBillingWebhookLog({
      data: data,
      select: {
        fechaRegistro: true,
        id: true,
        referenceId: true,
        response: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [BillingWebhookLog] })
  @ApiNestedQuery(BillingWebhookLogFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "BillingWebhookLog",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async billingWebhookLogs(
    @common.Req() request: Request
  ): Promise<BillingWebhookLog[]> {
    const args = plainToClass(BillingWebhookLogFindManyArgs, request.query);
    return this.service.billingWebhookLogs({
      ...args,
      select: {
        fechaRegistro: true,
        id: true,
        referenceId: true,
        response: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: BillingWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingWebhookLog",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async billingWebhookLog(
    @common.Param() params: BillingWebhookLogWhereUniqueInput
  ): Promise<BillingWebhookLog | null> {
    const result = await this.service.billingWebhookLog({
      where: params,
      select: {
        fechaRegistro: true,
        id: true,
        referenceId: true,
        response: true,
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
  @swagger.ApiOkResponse({ type: BillingWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingWebhookLog",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateBillingWebhookLog(
    @common.Param() params: BillingWebhookLogWhereUniqueInput,
    @common.Body() data: BillingWebhookLogUpdateInput
  ): Promise<BillingWebhookLog | null> {
    try {
      return await this.service.updateBillingWebhookLog({
        where: params,
        data: data,
        select: {
          fechaRegistro: true,
          id: true,
          referenceId: true,
          response: true,
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
  @swagger.ApiOkResponse({ type: BillingWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BillingWebhookLog",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteBillingWebhookLog(
    @common.Param() params: BillingWebhookLogWhereUniqueInput
  ): Promise<BillingWebhookLog | null> {
    try {
      return await this.service.deleteBillingWebhookLog({
        where: params,
        select: {
          fechaRegistro: true,
          id: true,
          referenceId: true,
          response: true,
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
