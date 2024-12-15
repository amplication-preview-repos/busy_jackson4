/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, PaymentPeriod as PrismaPaymentPeriod } from "@prisma/client";

export class PaymentPeriodServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.PaymentPeriodCountArgs, "select">
  ): Promise<number> {
    return this.prisma.paymentPeriod.count(args);
  }

  async paymentPeriods<T extends Prisma.PaymentPeriodFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentPeriodFindManyArgs>
  ): Promise<PrismaPaymentPeriod[]> {
    return this.prisma.paymentPeriod.findMany<Prisma.PaymentPeriodFindManyArgs>(
      args
    );
  }
  async paymentPeriod<T extends Prisma.PaymentPeriodFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentPeriodFindUniqueArgs>
  ): Promise<PrismaPaymentPeriod | null> {
    return this.prisma.paymentPeriod.findUnique(args);
  }
  async createPaymentPeriod<T extends Prisma.PaymentPeriodCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentPeriodCreateArgs>
  ): Promise<PrismaPaymentPeriod> {
    return this.prisma.paymentPeriod.create<T>(args);
  }
  async updatePaymentPeriod<T extends Prisma.PaymentPeriodUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentPeriodUpdateArgs>
  ): Promise<PrismaPaymentPeriod> {
    return this.prisma.paymentPeriod.update<T>(args);
  }
  async deletePaymentPeriod<T extends Prisma.PaymentPeriodDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentPeriodDeleteArgs>
  ): Promise<PrismaPaymentPeriod> {
    return this.prisma.paymentPeriod.delete(args);
  }
}
