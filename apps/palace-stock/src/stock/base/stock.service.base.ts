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
  Stock as PrismaStock,
  Item as PrismaItem,
  Warehouse as PrismaWarehouse,
} from "@prisma/client";

export class StockServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.StockCountArgs, "select">): Promise<number> {
    return this.prisma.stock.count(args);
  }

  async stocks<T extends Prisma.StockFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StockFindManyArgs>
  ): Promise<PrismaStock[]> {
    return this.prisma.stock.findMany<Prisma.StockFindManyArgs>(args);
  }
  async stock<T extends Prisma.StockFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.StockFindUniqueArgs>
  ): Promise<PrismaStock | null> {
    return this.prisma.stock.findUnique(args);
  }
  async createStock<T extends Prisma.StockCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StockCreateArgs>
  ): Promise<PrismaStock> {
    return this.prisma.stock.create<T>(args);
  }
  async updateStock<T extends Prisma.StockUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StockUpdateArgs>
  ): Promise<PrismaStock> {
    return this.prisma.stock.update<T>(args);
  }
  async deleteStock<T extends Prisma.StockDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.StockDeleteArgs>
  ): Promise<PrismaStock> {
    return this.prisma.stock.delete(args);
  }

  async getItems(parentId: number): Promise<PrismaItem | null> {
    return this.prisma.stock
      .findUnique({
        where: { id: parentId },
      })
      .items();
  }

  async getWarehouses(parentId: number): Promise<PrismaWarehouse | null> {
    return this.prisma.stock
      .findUnique({
        where: { id: parentId },
      })
      .warehouses();
  }
}
