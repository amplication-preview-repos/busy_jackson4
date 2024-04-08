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
  BillingClassifCode as PrismaBillingClassifCode,
} from "@prisma/client";

export class BillingClassifCodeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.BillingClassifCodeCountArgs, "select">
  ): Promise<number> {
    return this.prisma.billingClassifCode.count(args);
  }

  async billingClassifCodes<T extends Prisma.BillingClassifCodeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingClassifCodeFindManyArgs>
  ): Promise<PrismaBillingClassifCode[]> {
    return this.prisma.billingClassifCode.findMany<Prisma.BillingClassifCodeFindManyArgs>(
      args
    );
  }
  async billingClassifCode<T extends Prisma.BillingClassifCodeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingClassifCodeFindUniqueArgs>
  ): Promise<PrismaBillingClassifCode | null> {
    return this.prisma.billingClassifCode.findUnique(args);
  }
  async createBillingClassifCode<T extends Prisma.BillingClassifCodeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingClassifCodeCreateArgs>
  ): Promise<PrismaBillingClassifCode> {
    return this.prisma.billingClassifCode.create<T>(args);
  }
  async updateBillingClassifCode<T extends Prisma.BillingClassifCodeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingClassifCodeUpdateArgs>
  ): Promise<PrismaBillingClassifCode> {
    return this.prisma.billingClassifCode.update<T>(args);
  }
  async deleteBillingClassifCode<T extends Prisma.BillingClassifCodeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingClassifCodeDeleteArgs>
  ): Promise<PrismaBillingClassifCode> {
    return this.prisma.billingClassifCode.delete(args);
  }
}