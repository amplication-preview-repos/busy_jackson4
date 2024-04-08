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
  TransacError as PrismaTransacError,
  BranchOffice as PrismaBranchOffice,
} from "@prisma/client";

export class TransacErrorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.TransacErrorCountArgs, "select">
  ): Promise<number> {
    return this.prisma.transacError.count(args);
  }

  async transacErrors<T extends Prisma.TransacErrorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransacErrorFindManyArgs>
  ): Promise<PrismaTransacError[]> {
    return this.prisma.transacError.findMany<Prisma.TransacErrorFindManyArgs>(
      args
    );
  }
  async transacError<T extends Prisma.TransacErrorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransacErrorFindUniqueArgs>
  ): Promise<PrismaTransacError | null> {
    return this.prisma.transacError.findUnique(args);
  }
  async createTransacError<T extends Prisma.TransacErrorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransacErrorCreateArgs>
  ): Promise<PrismaTransacError> {
    return this.prisma.transacError.create<T>(args);
  }
  async updateTransacError<T extends Prisma.TransacErrorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransacErrorUpdateArgs>
  ): Promise<PrismaTransacError> {
    return this.prisma.transacError.update<T>(args);
  }
  async deleteTransacError<T extends Prisma.TransacErrorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TransacErrorDeleteArgs>
  ): Promise<PrismaTransacError> {
    return this.prisma.transacError.delete(args);
  }

  async getBranchOffices(parentId: number): Promise<PrismaBranchOffice | null> {
    return this.prisma.transacError
      .findUnique({
        where: { id: parentId },
      })
      .branchOffices();
  }
}