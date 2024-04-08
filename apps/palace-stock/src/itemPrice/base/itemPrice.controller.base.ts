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
import { ItemPriceService } from "../itemPrice.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ItemPriceCreateInput } from "./ItemPriceCreateInput";
import { ItemPrice } from "./ItemPrice";
import { ItemPriceFindManyArgs } from "./ItemPriceFindManyArgs";
import { ItemPriceWhereUniqueInput } from "./ItemPriceWhereUniqueInput";
import { ItemPriceUpdateInput } from "./ItemPriceUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ItemPriceControllerBase {
  constructor(
    protected readonly service: ItemPriceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ItemPrice })
  @nestAccessControl.UseRoles({
    resource: "ItemPrice",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createItemPrice(
    @common.Body() data: ItemPriceCreateInput
  ): Promise<ItemPrice> {
    return await this.service.createItemPrice({
      data: {
        ...data,

        items: {
          connect: data.items,
        },
      },
      select: {
        comisionInmediata: true,
        createdUserId: true,
        descripcionArt: true,
        enganche: true,
        fechaLanzamiento: true,
        gamma: true,
        id: true,

        items: {
          select: {
            id: true,
          },
        },

        modelo: true,
        precioVenta: true,
        tipo_venta: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [ItemPrice] })
  @ApiNestedQuery(ItemPriceFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ItemPrice",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async itemPrices(@common.Req() request: Request): Promise<ItemPrice[]> {
    const args = plainToClass(ItemPriceFindManyArgs, request.query);
    return this.service.itemPrices({
      ...args,
      select: {
        comisionInmediata: true,
        createdUserId: true,
        descripcionArt: true,
        enganche: true,
        fechaLanzamiento: true,
        gamma: true,
        id: true,

        items: {
          select: {
            id: true,
          },
        },

        modelo: true,
        precioVenta: true,
        tipo_venta: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ItemPrice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ItemPrice",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async itemPrice(
    @common.Param() params: ItemPriceWhereUniqueInput
  ): Promise<ItemPrice | null> {
    const result = await this.service.itemPrice({
      where: params,
      select: {
        comisionInmediata: true,
        createdUserId: true,
        descripcionArt: true,
        enganche: true,
        fechaLanzamiento: true,
        gamma: true,
        id: true,

        items: {
          select: {
            id: true,
          },
        },

        modelo: true,
        precioVenta: true,
        tipo_venta: true,
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
  @swagger.ApiOkResponse({ type: ItemPrice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ItemPrice",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateItemPrice(
    @common.Param() params: ItemPriceWhereUniqueInput,
    @common.Body() data: ItemPriceUpdateInput
  ): Promise<ItemPrice | null> {
    try {
      return await this.service.updateItemPrice({
        where: params,
        data: {
          ...data,

          items: {
            connect: data.items,
          },
        },
        select: {
          comisionInmediata: true,
          createdUserId: true,
          descripcionArt: true,
          enganche: true,
          fechaLanzamiento: true,
          gamma: true,
          id: true,

          items: {
            select: {
              id: true,
            },
          },

          modelo: true,
          precioVenta: true,
          tipo_venta: true,
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
  @swagger.ApiOkResponse({ type: ItemPrice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ItemPrice",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteItemPrice(
    @common.Param() params: ItemPriceWhereUniqueInput
  ): Promise<ItemPrice | null> {
    try {
      return await this.service.deleteItemPrice({
        where: params,
        select: {
          comisionInmediata: true,
          createdUserId: true,
          descripcionArt: true,
          enganche: true,
          fechaLanzamiento: true,
          gamma: true,
          id: true,

          items: {
            select: {
              id: true,
            },
          },

          modelo: true,
          precioVenta: true,
          tipo_venta: true,
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
