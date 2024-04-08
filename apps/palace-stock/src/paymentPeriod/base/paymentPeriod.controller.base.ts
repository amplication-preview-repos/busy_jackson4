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
import { PaymentPeriodService } from "../paymentPeriod.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { PaymentPeriodCreateInput } from "./PaymentPeriodCreateInput";
import { PaymentPeriod } from "./PaymentPeriod";
import { PaymentPeriodFindManyArgs } from "./PaymentPeriodFindManyArgs";
import { PaymentPeriodWhereUniqueInput } from "./PaymentPeriodWhereUniqueInput";
import { PaymentPeriodUpdateInput } from "./PaymentPeriodUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class PaymentPeriodControllerBase {
  constructor(
    protected readonly service: PaymentPeriodService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: PaymentPeriod })
  @nestAccessControl.UseRoles({
    resource: "PaymentPeriod",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createPaymentPeriod(
    @common.Body() data: PaymentPeriodCreateInput
  ): Promise<PaymentPeriod> {
    return await this.service.createPaymentPeriod({
      data: data,
      select: {
        categoria_plazo: true,
        id: true,
        interesAnualGeneral: true,
        meses: true,
        plazo: true,
        rangoFinal: true,
        rangoInicial: true,
        tipo_plazo: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [PaymentPeriod] })
  @ApiNestedQuery(PaymentPeriodFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "PaymentPeriod",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async paymentPeriods(
    @common.Req() request: Request
  ): Promise<PaymentPeriod[]> {
    const args = plainToClass(PaymentPeriodFindManyArgs, request.query);
    return this.service.paymentPeriods({
      ...args,
      select: {
        categoria_plazo: true,
        id: true,
        interesAnualGeneral: true,
        meses: true,
        plazo: true,
        rangoFinal: true,
        rangoInicial: true,
        tipo_plazo: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: PaymentPeriod })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "PaymentPeriod",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async paymentPeriod(
    @common.Param() params: PaymentPeriodWhereUniqueInput
  ): Promise<PaymentPeriod | null> {
    const result = await this.service.paymentPeriod({
      where: params,
      select: {
        categoria_plazo: true,
        id: true,
        interesAnualGeneral: true,
        meses: true,
        plazo: true,
        rangoFinal: true,
        rangoInicial: true,
        tipo_plazo: true,
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
  @swagger.ApiOkResponse({ type: PaymentPeriod })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "PaymentPeriod",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updatePaymentPeriod(
    @common.Param() params: PaymentPeriodWhereUniqueInput,
    @common.Body() data: PaymentPeriodUpdateInput
  ): Promise<PaymentPeriod | null> {
    try {
      return await this.service.updatePaymentPeriod({
        where: params,
        data: data,
        select: {
          categoria_plazo: true,
          id: true,
          interesAnualGeneral: true,
          meses: true,
          plazo: true,
          rangoFinal: true,
          rangoInicial: true,
          tipo_plazo: true,
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
  @swagger.ApiOkResponse({ type: PaymentPeriod })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "PaymentPeriod",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deletePaymentPeriod(
    @common.Param() params: PaymentPeriodWhereUniqueInput
  ): Promise<PaymentPeriod | null> {
    try {
      return await this.service.deletePaymentPeriod({
        where: params,
        select: {
          categoria_plazo: true,
          id: true,
          interesAnualGeneral: true,
          meses: true,
          plazo: true,
          rangoFinal: true,
          rangoInicial: true,
          tipo_plazo: true,
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