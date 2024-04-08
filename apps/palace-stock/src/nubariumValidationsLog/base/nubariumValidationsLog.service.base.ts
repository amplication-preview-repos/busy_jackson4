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
  NubariumValidationsLog as PrismaNubariumValidationsLog,
} from "@prisma/client";

export class NubariumValidationsLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.NubariumValidationsLogCountArgs, "select">
  ): Promise<number> {
    return this.prisma.nubariumValidationsLog.count(args);
  }

  async nubariumValidationsLogs<
    T extends Prisma.NubariumValidationsLogFindManyArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationsLogFindManyArgs>
  ): Promise<PrismaNubariumValidationsLog[]> {
    return this.prisma.nubariumValidationsLog.findMany<Prisma.NubariumValidationsLogFindManyArgs>(
      args
    );
  }
  async nubariumValidationsLog<
    T extends Prisma.NubariumValidationsLogFindUniqueArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationsLogFindUniqueArgs>
  ): Promise<PrismaNubariumValidationsLog | null> {
    return this.prisma.nubariumValidationsLog.findUnique(args);
  }
  async createNubariumValidationsLog<
    T extends Prisma.NubariumValidationsLogCreateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationsLogCreateArgs>
  ): Promise<PrismaNubariumValidationsLog> {
    return this.prisma.nubariumValidationsLog.create<T>(args);
  }
  async updateNubariumValidationsLog<
    T extends Prisma.NubariumValidationsLogUpdateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationsLogUpdateArgs>
  ): Promise<PrismaNubariumValidationsLog> {
    return this.prisma.nubariumValidationsLog.update<T>(args);
  }
  async deleteNubariumValidationsLog<
    T extends Prisma.NubariumValidationsLogDeleteArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.NubariumValidationsLogDeleteArgs>
  ): Promise<PrismaNubariumValidationsLog> {
    return this.prisma.nubariumValidationsLog.delete(args);
  }
}