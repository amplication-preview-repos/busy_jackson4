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
import { TransactionService } from "../transaction.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { TransactionCreateInput } from "./TransactionCreateInput";
import { Transaction } from "./Transaction";
import { TransactionFindManyArgs } from "./TransactionFindManyArgs";
import { TransactionWhereUniqueInput } from "./TransactionWhereUniqueInput";
import { TransactionUpdateInput } from "./TransactionUpdateInput";
import { FinancedAccessoryFindManyArgs } from "../../financedAccessory/base/FinancedAccessoryFindManyArgs";
import { FinancedAccessory } from "../../financedAccessory/base/FinancedAccessory";
import { FinancedAccessoryWhereUniqueInput } from "../../financedAccessory/base/FinancedAccessoryWhereUniqueInput";
import { KardexFindManyArgs } from "../../kardex/base/KardexFindManyArgs";
import { Kardex } from "../../kardex/base/Kardex";
import { KardexWhereUniqueInput } from "../../kardex/base/KardexWhereUniqueInput";
import { KardexSeryFindManyArgs } from "../../kardexSery/base/KardexSeryFindManyArgs";
import { KardexSery } from "../../kardexSery/base/KardexSery";
import { KardexSeryWhereUniqueInput } from "../../kardexSery/base/KardexSeryWhereUniqueInput";
import { TransitTransferFindManyArgs } from "../../transitTransfer/base/TransitTransferFindManyArgs";
import { TransitTransfer } from "../../transitTransfer/base/TransitTransfer";
import { TransitTransferWhereUniqueInput } from "../../transitTransfer/base/TransitTransferWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class TransactionControllerBase {
  constructor(
    protected readonly service: TransactionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Transaction })
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createTransaction(
    @common.Body() data: TransactionCreateInput
  ): Promise<Transaction> {
    return await this.service.createTransaction({
      data: {
        ...data,

        branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices:
          data.branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices
            ? {
                connect:
                  data.branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices,
              }
            : undefined,

        branchOfficesTransactionsBranchOfficeIdTobranchOffices: {
          connect: data.branchOfficesTransactionsBranchOfficeIdTobranchOffices,
        },

        customers: data.customers
          ? {
              connect: data.customers,
            }
          : undefined,

        warehouses: data.warehouses
          ? {
              connect: data.warehouses,
            }
          : undefined,
      },
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
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Transaction] })
  @ApiNestedQuery(TransactionFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async transactions(@common.Req() request: Request): Promise<Transaction[]> {
    const args = plainToClass(TransactionFindManyArgs, request.query);
    return this.service.transactions({
      ...args,
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
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async transaction(
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<Transaction | null> {
    const result = await this.service.transaction({
      where: params,
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
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateTransaction(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() data: TransactionUpdateInput
  ): Promise<Transaction | null> {
    try {
      return await this.service.updateTransaction({
        where: params,
        data: {
          ...data,

          branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices:
            data.branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices
              ? {
                  connect:
                    data.branchOfficesTransactionsAnotherBranchOfficeIdTobranchOffices,
                }
              : undefined,

          branchOfficesTransactionsBranchOfficeIdTobranchOffices: {
            connect:
              data.branchOfficesTransactionsBranchOfficeIdTobranchOffices,
          },

          customers: data.customers
            ? {
                connect: data.customers,
              }
            : undefined,

          warehouses: data.warehouses
            ? {
                connect: data.warehouses,
              }
            : undefined,
        },
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
  @swagger.ApiOkResponse({ type: Transaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteTransaction(
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<Transaction | null> {
    try {
      return await this.service.deleteTransaction({
        where: params,
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
  @common.Get("/:id/financedAccessories")
  @ApiNestedQuery(FinancedAccessoryFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "FinancedAccessory",
    action: "read",
    possession: "any",
  })
  async findFinancedAccessories(
    @common.Req() request: Request,
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<FinancedAccessory[]> {
    const query = plainToClass(FinancedAccessoryFindManyArgs, request.query);
    const results = await this.service.findFinancedAccessories(params.id, {
      ...query,
      select: {
        cantUnidades: true,
        engancheAccesorio: true,

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,

        items: {
          select: {
            id: true,
          },
        },

        precioVenta: true,

        transactions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/financedAccessories")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async connectFinancedAccessories(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: FinancedAccessoryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      financedAccessories: {
        connect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/financedAccessories")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async updateFinancedAccessories(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: FinancedAccessoryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      financedAccessories: {
        set: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/financedAccessories")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async disconnectFinancedAccessories(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: FinancedAccessoryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      financedAccessories: {
        disconnect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/kardex")
  @ApiNestedQuery(KardexFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Kardex",
    action: "read",
    possession: "any",
  })
  async findKardex(
    @common.Req() request: Request,
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<Kardex[]> {
    const query = plainToClass(KardexFindManyArgs, request.query);
    const results = await this.service.findKardex(params.id, {
      ...query,
      select: {
        cantUnidades: true,

        cashSales: {
          select: {
            id: true,
          },
        },

        financedSales: {
          select: {
            id: true,
          },
        },

        id: true,

        items: {
          select: {
            id: true,
          },
        },

        ivaUnidad: true,

        payments: {
          select: {
            id: true,
          },
        },

        personalLoans: {
          select: {
            id: true,
          },
        },

        precioUnidad: true,
        tipo_inventario: true,

        transactions: {
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/kardex")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async connectKardex(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardex: {
        connect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/kardex")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async updateKardex(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardex: {
        set: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/kardex")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async disconnectKardex(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardex: {
        disconnect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/kardexSeries")
  @ApiNestedQuery(KardexSeryFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "KardexSery",
    action: "read",
    possession: "any",
  })
  async findKardexSeries(
    @common.Req() request: Request,
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<KardexSery[]> {
    const query = plainToClass(KardexSeryFindManyArgs, request.query);
    const results = await this.service.findKardexSeries(params.id, {
      ...query,
      select: {
        codigoBloqueo: true,
        id: true,

        items: {
          select: {
            id: true,
          },
        },

        otraSerie: true,
        serialCode: true,

        transactions: {
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/kardexSeries")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async connectKardexSeries(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexSeryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardexSeries: {
        connect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/kardexSeries")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async updateKardexSeries(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexSeryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardexSeries: {
        set: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/kardexSeries")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async disconnectKardexSeries(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: KardexSeryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      kardexSeries: {
        disconnect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/transitTransfers")
  @ApiNestedQuery(TransitTransferFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "TransitTransfer",
    action: "read",
    possession: "any",
  })
  async findTransitTransfers(
    @common.Req() request: Request,
    @common.Param() params: TransactionWhereUniqueInput
  ): Promise<TransitTransfer[]> {
    const query = plainToClass(TransitTransferFindManyArgs, request.query);
    const results = await this.service.findTransitTransfers(params.id, {
      ...query,
      select: {
        id: true,

        transactions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/transitTransfers")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async connectTransitTransfers(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: TransitTransferWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transitTransfers: {
        connect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/transitTransfers")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async updateTransitTransfers(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: TransitTransferWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transitTransfers: {
        set: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/transitTransfers")
  @nestAccessControl.UseRoles({
    resource: "Transaction",
    action: "update",
    possession: "any",
  })
  async disconnectTransitTransfers(
    @common.Param() params: TransactionWhereUniqueInput,
    @common.Body() body: TransitTransferWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      transitTransfers: {
        disconnect: body,
      },
    };
    await this.service.updateTransaction({
      where: params,
      data,
      select: { id: true },
    });
  }
}
