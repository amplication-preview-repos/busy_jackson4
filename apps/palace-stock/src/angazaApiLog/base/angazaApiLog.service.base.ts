/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, AngazaApiLog as PrismaAngazaApiLog } from "@prisma/client";

export class AngazaApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.AngazaApiLogCountArgs, "select">
  ): Promise<number> {
    return this.prisma.angazaApiLog.count(args);
  }

  async angazaApiLogs<T extends Prisma.AngazaApiLogFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AngazaApiLogFindManyArgs>
  ): Promise<PrismaAngazaApiLog[]> {
    return this.prisma.angazaApiLog.findMany<Prisma.AngazaApiLogFindManyArgs>(
      args
    );
  }
  async angazaApiLog<T extends Prisma.AngazaApiLogFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AngazaApiLogFindUniqueArgs>
  ): Promise<PrismaAngazaApiLog | null> {
    return this.prisma.angazaApiLog.findUnique(args);
  }
  async createAngazaApiLog<T extends Prisma.AngazaApiLogCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AngazaApiLogCreateArgs>
  ): Promise<PrismaAngazaApiLog> {
    return this.prisma.angazaApiLog.create<T>(args);
  }
  async updateAngazaApiLog<T extends Prisma.AngazaApiLogUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AngazaApiLogUpdateArgs>
  ): Promise<PrismaAngazaApiLog> {
    return this.prisma.angazaApiLog.update<T>(args);
  }
  async deleteAngazaApiLog<T extends Prisma.AngazaApiLogDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AngazaApiLogDeleteArgs>
  ): Promise<PrismaAngazaApiLog> {
    return this.prisma.angazaApiLog.delete(args);
  }
}