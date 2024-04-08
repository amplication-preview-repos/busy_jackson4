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
  NubariumValidation as PrismaNubariumValidation,
  UserModel as PrismaUserModel,
  Warehouse as PrismaWarehouse,
} from "@prisma/client";

export class NubariumValidationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.NubariumValidationCountArgs, "select">
  ): Promise<number> {
    return this.prisma.nubariumValidation.count(args);
  }

  async nubariumValidations<T extends Prisma.NubariumValidationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationFindManyArgs>
  ): Promise<PrismaNubariumValidation[]> {
    return this.prisma.nubariumValidation.findMany<Prisma.NubariumValidationFindManyArgs>(
      args
    );
  }
  async nubariumValidation<T extends Prisma.NubariumValidationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationFindUniqueArgs>
  ): Promise<PrismaNubariumValidation | null> {
    return this.prisma.nubariumValidation.findUnique(args);
  }
  async createNubariumValidation<T extends Prisma.NubariumValidationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationCreateArgs>
  ): Promise<PrismaNubariumValidation> {
    return this.prisma.nubariumValidation.create<T>(args);
  }
  async updateNubariumValidation<T extends Prisma.NubariumValidationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationUpdateArgs>
  ): Promise<PrismaNubariumValidation> {
    return this.prisma.nubariumValidation.update<T>(args);
  }
  async deleteNubariumValidation<T extends Prisma.NubariumValidationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationDeleteArgs>
  ): Promise<PrismaNubariumValidation> {
    return this.prisma.nubariumValidation.delete(args);
  }

  async getUsers(parentId: number): Promise<PrismaUserModel | null> {
    return this.prisma.nubariumValidation
      .findUnique({
        where: { id: parentId },
      })
      .users();
  }

  async getWarehouses(parentId: number): Promise<PrismaWarehouse | null> {
    return this.prisma.nubariumValidation
      .findUnique({
        where: { id: parentId },
      })
      .warehouses();
  }
}