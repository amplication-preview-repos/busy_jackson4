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
import { StripeWebhookLogService } from "../stripeWebhookLog.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { StripeWebhookLogCreateInput } from "./StripeWebhookLogCreateInput";
import { StripeWebhookLog } from "./StripeWebhookLog";
import { StripeWebhookLogFindManyArgs } from "./StripeWebhookLogFindManyArgs";
import { StripeWebhookLogWhereUniqueInput } from "./StripeWebhookLogWhereUniqueInput";
import { StripeWebhookLogUpdateInput } from "./StripeWebhookLogUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class StripeWebhookLogControllerBase {
  constructor(
    protected readonly service: StripeWebhookLogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: StripeWebhookLog })
  @nestAccessControl.UseRoles({
    resource: "StripeWebhookLog",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createStripeWebhookLog(
    @common.Body() data: StripeWebhookLogCreateInput
  ): Promise<StripeWebhookLog> {
    return await this.service.createStripeWebhookLog({
      data: data,
      select: {
        eventId: true,
        eventStatus: true,
        eventType: true,
        fechaRegistro: true,
        id: true,
        paymentIntentId: true,
        response: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [StripeWebhookLog] })
  @ApiNestedQuery(StripeWebhookLogFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "StripeWebhookLog",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async stripeWebhookLogs(
    @common.Req() request: Request
  ): Promise<StripeWebhookLog[]> {
    const args = plainToClass(StripeWebhookLogFindManyArgs, request.query);
    return this.service.stripeWebhookLogs({
      ...args,
      select: {
        eventId: true,
        eventStatus: true,
        eventType: true,
        fechaRegistro: true,
        id: true,
        paymentIntentId: true,
        response: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: StripeWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "StripeWebhookLog",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async stripeWebhookLog(
    @common.Param() params: StripeWebhookLogWhereUniqueInput
  ): Promise<StripeWebhookLog | null> {
    const result = await this.service.stripeWebhookLog({
      where: params,
      select: {
        eventId: true,
        eventStatus: true,
        eventType: true,
        fechaRegistro: true,
        id: true,
        paymentIntentId: true,
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
  @swagger.ApiOkResponse({ type: StripeWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "StripeWebhookLog",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateStripeWebhookLog(
    @common.Param() params: StripeWebhookLogWhereUniqueInput,
    @common.Body() data: StripeWebhookLogUpdateInput
  ): Promise<StripeWebhookLog | null> {
    try {
      return await this.service.updateStripeWebhookLog({
        where: params,
        data: data,
        select: {
          eventId: true,
          eventStatus: true,
          eventType: true,
          fechaRegistro: true,
          id: true,
          paymentIntentId: true,
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
  @swagger.ApiOkResponse({ type: StripeWebhookLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "StripeWebhookLog",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteStripeWebhookLog(
    @common.Param() params: StripeWebhookLogWhereUniqueInput
  ): Promise<StripeWebhookLog | null> {
    try {
      return await this.service.deleteStripeWebhookLog({
        where: params,
        select: {
          eventId: true,
          eventStatus: true,
          eventType: true,
          fechaRegistro: true,
          id: true,
          paymentIntentId: true,
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
