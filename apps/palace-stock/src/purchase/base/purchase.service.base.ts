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
  Purchase as PrismaPurchase,
  UserModel as PrismaUserModel,
  Vendor as PrismaVendor,
} from "@prisma/client";

export class PurchaseServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.PurchaseCountArgs, "select">): Promise<number> {
    return this.prisma.purchase.count(args);
  }

  async purchases<T extends Prisma.PurchaseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseFindManyArgs>
  ): Promise<PrismaPurchase[]> {
    return this.prisma.purchase.findMany<Prisma.PurchaseFindManyArgs>(args);
  }
  async purchase<T extends Prisma.PurchaseFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseFindUniqueArgs>
  ): Promise<PrismaPurchase | null> {
    return this.prisma.purchase.findUnique(args);
  }
  async createPurchase<T extends Prisma.PurchaseCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseCreateArgs>
  ): Promise<PrismaPurchase> {
    return this.prisma.purchase.create<T>(args);
  }
  async updatePurchase<T extends Prisma.PurchaseUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseUpdateArgs>
  ): Promise<PrismaPurchase> {
    return this.prisma.purchase.update<T>(args);
  }
  async deletePurchase<T extends Prisma.PurchaseDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseDeleteArgs>
  ): Promise<PrismaPurchase> {
    return this.prisma.purchase.delete(args);
  }

  async getUsersPurchasesCreatedUserIdTousers(
    parentId: number
  ): Promise<PrismaUserModel | null> {
    return this.prisma.purchase
      .findUnique({
        where: { id: parentId },
      })
      .usersPurchasesCreatedUserIdTousers();
  }

  async getUsersPurchasesUpdatedUserIdTousers(
    parentId: number
  ): Promise<PrismaUserModel | null> {
    return this.prisma.purchase
      .findUnique({
        where: { id: parentId },
      })
      .usersPurchasesUpdatedUserIdTousers();
  }

  async getVendors(parentId: number): Promise<PrismaVendor | null> {
    return this.prisma.purchase
      .findUnique({
        where: { id: parentId },
      })
      .vendors();
  }
}