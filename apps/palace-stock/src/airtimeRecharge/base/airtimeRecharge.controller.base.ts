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
import { AirtimeRechargeService } from "../airtimeRecharge.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AirtimeRechargeCreateInput } from "./AirtimeRechargeCreateInput";
import { AirtimeRecharge } from "./AirtimeRecharge";
import { AirtimeRechargeFindManyArgs } from "./AirtimeRechargeFindManyArgs";
import { AirtimeRechargeWhereUniqueInput } from "./AirtimeRechargeWhereUniqueInput";
import { AirtimeRechargeUpdateInput } from "./AirtimeRechargeUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class AirtimeRechargeControllerBase {
  constructor(
    protected readonly service: AirtimeRechargeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: AirtimeRecharge })
  @nestAccessControl.UseRoles({
    resource: "AirtimeRecharge",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createAirtimeRecharge(
    @common.Body() data: AirtimeRechargeCreateInput
  ): Promise<AirtimeRecharge> {
    return await this.service.createAirtimeRecharge({
      data: {
        ...data,

        conektaPaymentTransacs: data.conektaPaymentTransacs
          ? {
              connect: data.conektaPaymentTransacs,
            }
          : undefined,

        paycodePaymentTransacs: data.paycodePaymentTransacs
          ? {
              connect: data.paycodePaymentTransacs,
            }
          : undefined,
      },
      select: {
        conektaPaymentTransacs: {
          select: {
            id: true,
          },
        },

        descripcion: true,
        fechaRegistro: true,
        id: true,
        idTransaccion: true,
        monto: true,
        numeroTel: true,
        operadora: true,

        paycodePaymentTransacs: {
          select: {
            id: true,
          },
        },

        sku: true,
        tipo: true,
        vigencia: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [AirtimeRecharge] })
  @ApiNestedQuery(AirtimeRechargeFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "AirtimeRecharge",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async airtimeRecharges(
    @common.Req() request: Request
  ): Promise<AirtimeRecharge[]> {
    const args = plainToClass(AirtimeRechargeFindManyArgs, request.query);
    return this.service.airtimeRecharges({
      ...args,
      select: {
        conektaPaymentTransacs: {
          select: {
            id: true,
          },
        },

        descripcion: true,
        fechaRegistro: true,
        id: true,
        idTransaccion: true,
        monto: true,
        numeroTel: true,
        operadora: true,

        paycodePaymentTransacs: {
          select: {
            id: true,
          },
        },

        sku: true,
        tipo: true,
        vigencia: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: AirtimeRecharge })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AirtimeRecharge",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async airtimeRecharge(
    @common.Param() params: AirtimeRechargeWhereUniqueInput
  ): Promise<AirtimeRecharge | null> {
    const result = await this.service.airtimeRecharge({
      where: params,
      select: {
        conektaPaymentTransacs: {
          select: {
            id: true,
          },
        },

        descripcion: true,
        fechaRegistro: true,
        id: true,
        idTransaccion: true,
        monto: true,
        numeroTel: true,
        operadora: true,

        paycodePaymentTransacs: {
          select: {
            id: true,
          },
        },

        sku: true,
        tipo: true,
        vigencia: true,
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
  @swagger.ApiOkResponse({ type: AirtimeRecharge })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AirtimeRecharge",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateAirtimeRecharge(
    @common.Param() params: AirtimeRechargeWhereUniqueInput,
    @common.Body() data: AirtimeRechargeUpdateInput
  ): Promise<AirtimeRecharge | null> {
    try {
      return await this.service.updateAirtimeRecharge({
        where: params,
        data: {
          ...data,

          conektaPaymentTransacs: data.conektaPaymentTransacs
            ? {
                connect: data.conektaPaymentTransacs,
              }
            : undefined,

          paycodePaymentTransacs: data.paycodePaymentTransacs
            ? {
                connect: data.paycodePaymentTransacs,
              }
            : undefined,
        },
        select: {
          conektaPaymentTransacs: {
            select: {
              id: true,
            },
          },

          descripcion: true,
          fechaRegistro: true,
          id: true,
          idTransaccion: true,
          monto: true,
          numeroTel: true,
          operadora: true,

          paycodePaymentTransacs: {
            select: {
              id: true,
            },
          },

          sku: true,
          tipo: true,
          vigencia: true,
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
  @swagger.ApiOkResponse({ type: AirtimeRecharge })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "AirtimeRecharge",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteAirtimeRecharge(
    @common.Param() params: AirtimeRechargeWhereUniqueInput
  ): Promise<AirtimeRecharge | null> {
    try {
      return await this.service.deleteAirtimeRecharge({
        where: params,
        select: {
          conektaPaymentTransacs: {
            select: {
              id: true,
            },
          },

          descripcion: true,
          fechaRegistro: true,
          id: true,
          idTransaccion: true,
          monto: true,
          numeroTel: true,
          operadora: true,

          paycodePaymentTransacs: {
            select: {
              id: true,
            },
          },

          sku: true,
          tipo: true,
          vigencia: true,
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