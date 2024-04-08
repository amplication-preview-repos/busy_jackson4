/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, BillingConcept as PrismaBillingConcept } from "@prisma/client";

export class BillingConceptServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.BillingConceptCountArgs, "select">
  ): Promise<number> {
    return this.prisma.billingConcept.count(args);
  }

  async billingConcepts<T extends Prisma.BillingConceptFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingConceptFindManyArgs>
  ): Promise<PrismaBillingConcept[]> {
    return this.prisma.billingConcept.findMany<Prisma.BillingConceptFindManyArgs>(
      args
    );
  }
  async billingConcept<T extends Prisma.BillingConceptFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingConceptFindUniqueArgs>
  ): Promise<PrismaBillingConcept | null> {
    return this.prisma.billingConcept.findUnique(args);
  }
  async createBillingConcept<T extends Prisma.BillingConceptCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingConceptCreateArgs>
  ): Promise<PrismaBillingConcept> {
    return this.prisma.billingConcept.create<T>(args);
  }
  async updateBillingConcept<T extends Prisma.BillingConceptUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingConceptUpdateArgs>
  ): Promise<PrismaBillingConcept> {
    return this.prisma.billingConcept.update<T>(args);
  }
  async deleteBillingConcept<T extends Prisma.BillingConceptDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillingConceptDeleteArgs>
  ): Promise<PrismaBillingConcept> {
    return this.prisma.billingConcept.delete(args);
  }
}