/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Kardex as PrismaKardex,
  CashSale as PrismaCashSale,
  FinancedSale as PrismaFinancedSale,
  Item as PrismaItem,
  Payment as PrismaPayment,
  PersonalLoan as PrismaPersonalLoan,
  Transaction as PrismaTransaction,
  Warehouse as PrismaWarehouse,
} from "@prisma/client";

export class KardexServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.KardexCountArgs, "select">): Promise<number> {
    return this.prisma.kardex.count(args);
  }

  async kardexes<T extends Prisma.KardexFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.KardexFindManyArgs>
  ): Promise<PrismaKardex[]> {
    return this.prisma.kardex.findMany<Prisma.KardexFindManyArgs>(args);
  }
  async kardex<T extends Prisma.KardexFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.KardexFindUniqueArgs>
  ): Promise<PrismaKardex | null> {
    return this.prisma.kardex.findUnique(args);
  }
  async createKardex<T extends Prisma.KardexCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.KardexCreateArgs>
  ): Promise<PrismaKardex> {
    return this.prisma.kardex.create<T>(args);
  }
  async updateKardex<T extends Prisma.KardexUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.KardexUpdateArgs>
  ): Promise<PrismaKardex> {
    return this.prisma.kardex.update<T>(args);
  }
  async deleteKardex<T extends Prisma.KardexDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.KardexDeleteArgs>
  ): Promise<PrismaKardex> {
    return this.prisma.kardex.delete(args);
  }

  async getCashSales(parentId: number): Promise<PrismaCashSale | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .cashSales();
  }

  async getFinancedSales(parentId: number): Promise<PrismaFinancedSale | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .financedSales();
  }

  async getItems(parentId: number): Promise<PrismaItem | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .items();
  }

  async getPayments(parentId: number): Promise<PrismaPayment | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .payments();
  }

  async getPersonalLoans(parentId: number): Promise<PrismaPersonalLoan | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .personalLoans();
  }

  async getTransactions(parentId: number): Promise<PrismaTransaction | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .transactions();
  }

  async getWarehouses(parentId: number): Promise<PrismaWarehouse | null> {
    return this.prisma.kardex
      .findUnique({
        where: { id: parentId },
      })
      .warehouses();
  }
}