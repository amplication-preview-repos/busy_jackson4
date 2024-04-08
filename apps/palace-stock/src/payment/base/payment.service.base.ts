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
  Payment as PrismaPayment,
  Bill as PrismaBill,
  Document as PrismaDocument,
  Kardex as PrismaKardex,
  ModifiedPayment as PrismaModifiedPayment,
  CashCountDetail as PrismaCashCountDetail,
  ConektaPaymentTransac as PrismaConektaPaymentTransac,
  FinancedSale as PrismaFinancedSale,
  PaycodePaymentTransac as PrismaPaycodePaymentTransac,
  PersonalLoan as PrismaPersonalLoan,
  StripePaymentTransac as PrismaStripePaymentTransac,
  Warehouse as PrismaWarehouse,
} from "@prisma/client";

export class PaymentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.PaymentCountArgs, "select">): Promise<number> {
    return this.prisma.payment.count(args);
  }

  async payments<T extends Prisma.PaymentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentFindManyArgs>
  ): Promise<PrismaPayment[]> {
    return this.prisma.payment.findMany<Prisma.PaymentFindManyArgs>(args);
  }
  async payment<T extends Prisma.PaymentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentFindUniqueArgs>
  ): Promise<PrismaPayment | null> {
    return this.prisma.payment.findUnique(args);
  }
  async createPayment<T extends Prisma.PaymentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentCreateArgs>
  ): Promise<PrismaPayment> {
    return this.prisma.payment.create<T>(args);
  }
  async updatePayment<T extends Prisma.PaymentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentUpdateArgs>
  ): Promise<PrismaPayment> {
    return this.prisma.payment.update<T>(args);
  }
  async deletePayment<T extends Prisma.PaymentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PaymentDeleteArgs>
  ): Promise<PrismaPayment> {
    return this.prisma.payment.delete(args);
  }

  async findBills(
    parentId: number,
    args: Prisma.BillFindManyArgs
  ): Promise<PrismaBill[]> {
    return this.prisma.payment
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .bills(args);
  }

  async findDocuments(
    parentId: number,
    args: Prisma.DocumentFindManyArgs
  ): Promise<PrismaDocument[]> {
    return this.prisma.payment
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .documents(args);
  }

  async findKardex(
    parentId: number,
    args: Prisma.KardexFindManyArgs
  ): Promise<PrismaKardex[]> {
    return this.prisma.payment
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .kardex(args);
  }

  async findModifiedPayments(
    parentId: number,
    args: Prisma.ModifiedPaymentFindManyArgs
  ): Promise<PrismaModifiedPayment[]> {
    return this.prisma.payment
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .modifiedPayments(args);
  }

  async getCashCountDetails(
    parentId: number
  ): Promise<PrismaCashCountDetail | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .cashCountDetails();
  }

  async getConektaPaymentTransacs(
    parentId: number
  ): Promise<PrismaConektaPaymentTransac | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .conektaPaymentTransacs();
  }

  async getFinancedSales(parentId: number): Promise<PrismaFinancedSale | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .financedSales();
  }

  async getPaycodePaymentTransacs(
    parentId: number
  ): Promise<PrismaPaycodePaymentTransac | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .paycodePaymentTransacs();
  }

  async getPersonalLoans(parentId: number): Promise<PrismaPersonalLoan | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .personalLoans();
  }

  async getStripePaymentTransacs(
    parentId: number
  ): Promise<PrismaStripePaymentTransac | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .stripePaymentTransacs();
  }

  async getWarehouses(parentId: number): Promise<PrismaWarehouse | null> {
    return this.prisma.payment
      .findUnique({
        where: { id: parentId },
      })
      .warehouses();
  }
}