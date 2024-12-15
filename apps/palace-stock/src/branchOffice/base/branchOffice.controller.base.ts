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
import { BranchOfficeService } from "../branchOffice.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { BranchOfficeCreateInput } from "./BranchOfficeCreateInput";
import { BranchOffice } from "./BranchOffice";
import { BranchOfficeFindManyArgs } from "./BranchOfficeFindManyArgs";
import { BranchOfficeWhereUniqueInput } from "./BranchOfficeWhereUniqueInput";
import { BranchOfficeUpdateInput } from "./BranchOfficeUpdateInput";
import { TransacErrorFindManyArgs } from "../../transacError/base/TransacErrorFindManyArgs";
import { TransacError } from "../../transacError/base/TransacError";
import { TransacErrorWhereUniqueInput } from "../../transacError/base/TransacErrorWhereUniqueInput";
import { TransactionFindManyArgs } from "../../transaction/base/TransactionFindManyArgs";
import { Transaction } from "../../transaction/base/Transaction";
import { TransactionWhereUniqueInput } from "../../transaction/base/TransactionWhereUniqueInput";
import { WarehouseFindManyArgs } from "../../warehouse/base/WarehouseFindManyArgs";
import { Warehouse } from "../../warehouse/base/Warehouse";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class BranchOfficeControllerBase {
  constructor(
    protected readonly service: BranchOfficeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: BranchOffice })
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createBranchOffice(
    @common.Body() data: BranchOfficeCreateInput
  ): Promise<BranchOffice> {
    return await this.service.createBranchOffice({
      data: {
        ...data,

        users: {
          connect: data.users,
        },
      },
      select: {
        branchName: true,
        branchNo: true,
        ciudadMunicipio: true,
        codigoPostal: true,
        direccion: true,
        estadoRepublica: true,
        estatus_sucursal: true,
        fechaRegistro: true,
        id: true,
        region: true,

        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [BranchOffice] })
  @ApiNestedQuery(BranchOfficeFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async branchOffices(@common.Req() request: Request): Promise<BranchOffice[]> {
    const args = plainToClass(BranchOfficeFindManyArgs, request.query);
    return this.service.branchOffices({
      ...args,
      select: {
        branchName: true,
        branchNo: true,
        ciudadMunicipio: true,
        codigoPostal: true,
        direccion: true,
        estadoRepublica: true,
        estatus_sucursal: true,
        fechaRegistro: true,
        id: true,
        region: true,

        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: BranchOffice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async branchOffice(
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<BranchOffice | null> {
    const result = await this.service.branchOffice({
      where: params,
      select: {
        branchName: true,
        branchNo: true,
        ciudadMunicipio: true,
        codigoPostal: true,
        direccion: true,
        estadoRepublica: true,
        estatus_sucursal: true,
        fechaRegistro: true,
        id: true,
        region: true,

        users: {
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
  @swagger.ApiOkResponse({ type: BranchOffice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateBranchOffice(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() data: BranchOfficeUpdateInput
  ): Promise<BranchOffice | null> {
    try {
      return await this.service.updateBranchOffice({
        where: params,
        data: {
          ...data,

          users: {
            connect: data.users,
          },
        },
        select: {
          branchName: true,
          branchNo: true,
          ciudadMunicipio: true,
          codigoPostal: true,
          direccion: true,
          estadoRepublica: true,
          estatus_sucursal: true,
          fechaRegistro: true,
          id: true,
          region: true,

          users: {
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
  @swagger.ApiOkResponse({ type: BranchOffice })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteBranchOffice(
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<BranchOffice | null> {
    try {
      return await this.service.deleteBranchOffice({
        where: params,
        select: {
          branchName: true,
          branchNo: true,
          ciudadMunicipio: true,
          codigoPostal: true,
          direccion: true,
          estadoRepublica: true,
          estatus_sucursal: true,
          fechaRegistro: true,
          id: true,
          region: true,

          users: {
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

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/transacErrors")
  @ApiNestedQuery(TransacErrorFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "TransacError",
    action: "read",
    possession: "any",
  })
  async findTransacErrors(
    @common.Req() request: Request,
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<TransacError[]> {
    const query = plainToClass(TransacErrorFindManyArgs, request.query);
    const results = await this.service.findTransacErrors(params.id, {
      ...query,
      select: {
        branchOffices: {
          select: {
            id: true,
          },
        },

        folioTrans: true,
        id: true,
        seriesError: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/transacErrors")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async connectTransacErrors(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransacErrorWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transacErrors: {
        connect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/transacErrors")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async updateTransacErrors(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransacErrorWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transacErrors: {
        set: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/transacErrors")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async disconnectTransacErrors(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransacErrorWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transacErrors: {
        disconnect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get(
    "/:id/transactionsTransactionsAnotherBranchOfficeIdTobranchOffices"
  )
  @ApiNestedQuery(TransactionFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "any",
  })
  async findTransactionsTransactionsAnotherBranchOfficeIdTobranchOffices(
    @common.Req() request: Request,
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<Transaction[]> {
    const query = plainToClass(TransactionFindManyArgs, request.query);
    const results =
      await this.service.findTransactionsTransactionsAnotherBranchOfficeIdTobranchOffices(
        params.id,
        {
          ...query,
          select: {
            branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices: {
              select: {
                id: true,
              },
            },

            branchOfficesTransactionsBranchOfficeIdTobranchOffices: {
              select: {
                id: true,
              },
            },

            comentariosTrans: true,
            createdUserId: true,

            customers: {
              select: {
                id: true,
              },
            },

            estatus_trans: true,
            fechaTrans: true,
            folioDocto: true,
            horaTrans: true,
            id: true,
            move_type: true,
            numProveedor: true,
            transacFolio: true,

            warehouses: {
              select: {
                id: true,
              },
            },
          },
        }
      );
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post(
    "/:id/transactionsTransactionsAnotherBranchOfficeIdTobranchOffices"
  )
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async connectTransactionsTransactionsAnotherBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsAnotherBranchOfficeIdTobranchOffices: {
        connect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch(
    "/:id/transactionsTransactionsAnotherBranchOfficeIdTobranchOffices"
  )
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async updateTransactionsTransactionsAnotherBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsAnotherBranchOfficeIdTobranchOffices: {
        set: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete(
    "/:id/transactionsTransactionsAnotherBranchOfficeIdTobranchOffices"
  )
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async disconnectTransactionsTransactionsAnotherBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsAnotherBranchOfficeIdTobranchOffices: {
        disconnect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/transactionsTransactionsBranchOfficeIdTobranchOffices")
  @ApiNestedQuery(TransactionFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "any",
  })
  async findTransactionsTransactionsBranchOfficeIdTobranchOffices(
    @common.Req() request: Request,
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<Transaction[]> {
    const query = plainToClass(TransactionFindManyArgs, request.query);
    const results =
      await this.service.findTransactionsTransactionsBranchOfficeIdTobranchOffices(
        params.id,
        {
          ...query,
          select: {
            branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices: {
              select: {
                id: true,
              },
            },

            branchOfficesTransactionsBranchOfficeIdTobranchOffices: {
              select: {
                id: true,
              },
            },

            comentariosTrans: true,
            createdUserId: true,

            customers: {
              select: {
                id: true,
              },
            },

            estatus_trans: true,
            fechaTrans: true,
            folioDocto: true,
            horaTrans: true,
            id: true,
            move_type: true,
            numProveedor: true,
            transacFolio: true,

            warehouses: {
              select: {
                id: true,
              },
            },
          },
        }
      );
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/transactionsTransactionsBranchOfficeIdTobranchOffices")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async connectTransactionsTransactionsBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsBranchOfficeIdTobranchOffices: {
        connect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/transactionsTransactionsBranchOfficeIdTobranchOffices")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async updateTransactionsTransactionsBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsBranchOfficeIdTobranchOffices: {
        set: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/transactionsTransactionsBranchOfficeIdTobranchOffices")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async disconnectTransactionsTransactionsBranchOfficeIdTobranchOffices(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: TransactionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transactionsTransactionsBranchOfficeIdTobranchOffices: {
        disconnect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/warehouses")
  @ApiNestedQuery(WarehouseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "read",
    possession: "any",
  })
  async findWarehouses(
    @common.Req() request: Request,
    @common.Param() params: BranchOfficeWhereUniqueInput
  ): Promise<Warehouse[]> {
    const query = plainToClass(WarehouseFindManyArgs, request.query);
    const results = await this.service.findWarehouses(params.id, {
      ...query,
      select: {
        ajusteDesctoFinanc: true,
        ajusteMontoFijoEnganche: true,
        autorizarIneErroneaNubarium: true,
        autorizarNombresSinCoincidencia: true,
        autorizarSelfieSinCoincidencia: true,
        bloqueoVentaComputadora: true,

        branchOffices: {
          select: {
            id: true,
          },
        },

        cargar_solo_capturas_camara: true,
        catalogoCodigoPostal: true,
        confSaltarValidacionesPrestamosPersonales: true,
        contratoAlmacen: true,
        contratoAlmacenPdf: true,
        createdUserId: true,
        desctoPagoOportuno: true,
        desctoPagoOportunoPrestamos: true,
        descuentoEspecial: true,
        deshabilitar_validar_otro_financ: true,
        domicilioFiscal: true,
        dontLockDevices: true,
        estatus_almacen: true,
        fechaRegistro: true,
        forceAdvancePayments: true,
        habilitarBloqueoClienteCp: true,
        habilitar_envio_sms: true,
        habilitar_envio_whatsapp: true,
        habilitarPrestamoEquipos: true,
        horaInicioPagos: true,
        horaLimitePagos: true,
        id: true,
        impresion_comprobantes_pago: true,
        incluirEngancheCorte: true,
        mesa_control: true,
        metodo_envio_mensaje: true,
        promocionTemporal: true,
        referenciaPago: true,
        sendSmsUnlinkDevicesNuovo: true,
        telefonoValidacion: true,
        tipo_sucursal: true,
        ubicacion: true,
        whouseName: true,
        whouseNo: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/warehouses")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async connectWarehouses(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouses: {
        connect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/warehouses")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async updateWarehouses(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouses: {
        set: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/warehouses")
  @nestAccessControl.UseRoles({
    resource: "BranchOffice",
    action: "update",
    possession: "any",
  })
  async disconnectWarehouses(
    @common.Param() params: BranchOfficeWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouses: {
        disconnect: body,
      },
    };
    await this.service.updateBranchOffice({
      where: params,
      data,
      select: { id: true },
    });
  }
}
