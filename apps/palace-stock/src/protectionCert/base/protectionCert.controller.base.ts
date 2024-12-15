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
import { ProtectionCertService } from "../protectionCert.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ProtectionCertCreateInput } from "./ProtectionCertCreateInput";
import { ProtectionCert } from "./ProtectionCert";
import { ProtectionCertFindManyArgs } from "./ProtectionCertFindManyArgs";
import { ProtectionCertWhereUniqueInput } from "./ProtectionCertWhereUniqueInput";
import { ProtectionCertUpdateInput } from "./ProtectionCertUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ProtectionCertControllerBase {
  constructor(
    protected readonly service: ProtectionCertService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ProtectionCert })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCert",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createProtectionCert(
    @common.Body() data: ProtectionCertCreateInput
  ): Promise<ProtectionCert> {
    return await this.service.createProtectionCert({
      data: {
        ...data,

        customers: data.customers
          ? {
              connect: data.customers,
            }
          : undefined,

        financedSales: {
          connect: data.financedSales,
        },

        users: data.users
          ? {
              connect: data.users,
            }
          : undefined,

        warehouses: {
          connect: data.warehouses,
        },
      },
      select: {
        certFolio: true,
        createdUserId: true,

        customers: {
          select: {
            id: true,
          },
        },

        estatus_cert: true,
        fechaCancelacion: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        motivoCancelacion: true,
        protec_activadas: true,

        users: {
          select: {
            id: true,
          },
        },

        warehouses: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [ProtectionCert] })
  @ApiNestedQuery(ProtectionCertFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ProtectionCert",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async protectionCerts(
    @common.Req() request: Request
  ): Promise<ProtectionCert[]> {
    const args = plainToClass(ProtectionCertFindManyArgs, request.query);
    return this.service.protectionCerts({
      ...args,
      select: {
        certFolio: true,
        createdUserId: true,

        customers: {
          select: {
            id: true,
          },
        },

        estatus_cert: true,
        fechaCancelacion: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        motivoCancelacion: true,
        protec_activadas: true,

        users: {
          select: {
            id: true,
          },
        },

        warehouses: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ProtectionCert })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCert",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async protectionCert(
    @common.Param() params: ProtectionCertWhereUniqueInput
  ): Promise<ProtectionCert | null> {
    const result = await this.service.protectionCert({
      where: params,
      select: {
        certFolio: true,
        createdUserId: true,

        customers: {
          select: {
            id: true,
          },
        },

        estatus_cert: true,
        fechaCancelacion: true,
        fechaRegistro: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,
        motivoCancelacion: true,
        protec_activadas: true,

        users: {
          select: {
            id: true,
          },
        },

        warehouses: {
          select: {
            id: true,
          },
        },
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
  @swagger.ApiOkResponse({ type: ProtectionCert })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCert",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateProtectionCert(
    @common.Param() params: ProtectionCertWhereUniqueInput,
    @common.Body() data: ProtectionCertUpdateInput
  ): Promise<ProtectionCert | null> {
    try {
      return await this.service.updateProtectionCert({
        where: params,
        data: {
          ...data,

          customers: data.customers
            ? {
                connect: data.customers,
              }
            : undefined,

          financedSales: {
            connect: data.financedSales,
          },

          users: data.users
            ? {
                connect: data.users,
              }
            : undefined,

          warehouses: {
            connect: data.warehouses,
          },
        },
        select: {
          certFolio: true,
          createdUserId: true,

          customers: {
            select: {
              id: true,
            },
          },

          estatus_cert: true,
          fechaCancelacion: true,
          fechaRegistro: true,

          financedSales: {
            select: {
              id: true,
            },
          },

          id: true,
          motivoCancelacion: true,
          protec_activadas: true,

          users: {
            select: {
              id: true,
            },
          },

          warehouses: {
            select: {
              id: true,
            },
          },
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
  @swagger.ApiOkResponse({ type: ProtectionCert })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ProtectionCert",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteProtectionCert(
    @common.Param() params: ProtectionCertWhereUniqueInput
  ): Promise<ProtectionCert | null> {
    try {
      return await this.service.deleteProtectionCert({
        where: params,
        select: {
          certFolio: true,
          createdUserId: true,

          customers: {
            select: {
              id: true,
            },
          },

          estatus_cert: true,
          fechaCancelacion: true,
          fechaRegistro: true,

          financedSales: {
            select: {
              id: true,
            },
          },

          id: true,
          motivoCancelacion: true,
          protec_activadas: true,

          users: {
            select: {
              id: true,
            },
          },

          warehouses: {
            select: {
              id: true,
            },
          },
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
