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
import { AngazaPaymentService } from "../angazaPayment.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AngazaPaymentCreateInput } from "./AngazaPaymentCreateInput";
import { AngazaPayment } from "./AngazaPayment";
import { AngazaPaymentFindManyArgs } from "./AngazaPaymentFindManyArgs";
import { AngazaPaymentWhereUniqueInput } from "./AngazaPaymentWhereUniqueInput";
import { AngazaPaymentUpdateInput } from "./AngazaPaymentUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class AngazaPaymentControllerBase {
  constructor(
    protected readonly service: AngazaPaymentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: AngazaPayment })
  @nestAccessControl.UseRoles({
    resource: "AngazaPayment",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createAngazaPayment(
    @common.Body() data: AngazaPaymentCreateInput
  ): Promise<AngazaPayment> {
    return await this.service.createAngazaPayment({
      data: {
        ...data,

        financedSales: data.financedSales
          ? {
              connect: data.financedSales,
            }
          : undefined,
      },
      select: {
        accountNumber: true,
        accountQid: true,
        amount: true,
        angazaTransactionQid: true,
        currency: true,
        effectiveDate: true,
        externalXref: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        isReversed: true,
        msisdn: true,
        payQid: true,
        uuidIdentifier: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [AngazaPayment] })
  @ApiNestedQuery(AngazaPaymentFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "AngazaPayment",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async angazaPayments(
    @common.Req() request: Request
  ): Promise<AngazaPayment[]> {
    const args = plainToClass(AngazaPaymentFindManyArgs, request.query);
    return this.service.angazaPayments({
      ...args,
      select: {
        accountNumber: true,
        accountQid: true,
        amount: true,
        angazaTransactionQid: true,
        currency: true,
        effectiveDate: true,
        externalXref: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        isReversed: true,
        msisdn: true,
        payQid: true,
        uuidIdentifier: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: AngazaPayment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AngazaPayment",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async angazaPayment(
    @common.Param() params: AngazaPaymentWhereUniqueInput
  ): Promise<AngazaPayment | null> {
    const result = await this.service.angazaPayment({
      where: params,
      select: {
        accountNumber: true,
        accountQid: true,
        amount: true,
        angazaTransactionQid: true,
        currency: true,
        effectiveDate: true,
        externalXref: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        isReversed: true,
        msisdn: true,
        payQid: true,
        uuidIdentifier: true,
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
  @swagger.ApiOkResponse({ type: AngazaPayment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AngazaPayment",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateAngazaPayment(
    @common.Param() params: AngazaPaymentWhereUniqueInput,
    @common.Body() data: AngazaPaymentUpdateInput
  ): Promise<AngazaPayment | null> {
    try {
      return await this.service.updateAngazaPayment({
        where: params,
        data: {
          ...data,

          financedSales: data.financedSales
            ? {
                connect: data.financedSales,
              }
            : undefined,
        },
        select: {
          accountNumber: true,
          accountQid: true,
          amount: true,
          angazaTransactionQid: true,
          currency: true,
          effectiveDate: true,
          externalXref: true,
          fechaRegistro: true,

          financedSales: {
            select: {
              id: true,
            },
          },

          id: true,
          isReversed: true,
          msisdn: true,
          payQid: true,
          uuidIdentifier: true,
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
  @swagger.ApiOkResponse({ type: AngazaPayment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AngazaPayment",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteAngazaPayment(
    @common.Param() params: AngazaPaymentWhereUniqueInput
  ): Promise<AngazaPayment | null> {
    try {
      return await this.service.deleteAngazaPayment({
        where: params,
        select: {
          accountNumber: true,
          accountQid: true,
          amount: true,
          angazaTransactionQid: true,
          currency: true,
          effectiveDate: true,
          externalXref: true,
          fechaRegistro: true,

          financedSales: {
            select: {
              id: true,
            },
          },

          id: true,
          isReversed: true,
          msisdn: true,
          payQid: true,
          uuidIdentifier: true,
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