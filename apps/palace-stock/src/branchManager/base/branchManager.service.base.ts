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
  BranchManager as PrismaBranchManager,
  Collaborator as PrismaCollaborator,
  UserModel as PrismaUserModel,
  Warehouse as PrismaWarehouse,
} from "@prisma/client";

export class BranchManagerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.BranchManagerCountArgs, "select">
  ): Promise<number> {
    return this.prisma.branchManager.count(args);
  }

  async branchManagers<T extends Prisma.BranchManagerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BranchManagerFindManyArgs>
  ): Promise<PrismaBranchManager[]> {
    return this.prisma.branchManager.findMany<Prisma.BranchManagerFindManyArgs>(
      args
    );
  }
  async branchManager<T extends Prisma.BranchManagerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BranchManagerFindUniqueArgs>
  ): Promise<PrismaBranchManager | null> {
    return this.prisma.branchManager.findUnique(args);
  }
  async createBranchManager<T extends Prisma.BranchManagerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BranchManagerCreateArgs>
  ): Promise<PrismaBranchManager> {
    return this.prisma.branchManager.create<T>(args);
  }
  async updateBranchManager<T extends Prisma.BranchManagerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BranchManagerUpdateArgs>
  ): Promise<PrismaBranchManager> {
    return this.prisma.branchManager.update<T>(args);
  }
  async deleteBranchManager<T extends Prisma.BranchManagerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BranchManagerDeleteArgs>
  ): Promise<PrismaBranchManager> {
    return this.prisma.branchManager.delete(args);
  }

  async getCollaborators(parentId: number): Promise<PrismaCollaborator | null> {
    return this.prisma.branchManager
      .findUnique({
        where: { id: parentId },
      })
      .collaborators();
  }

  async getUsers(parentId: number): Promise<PrismaUserModel | null> {
    return this.prisma.branchManager
      .findUnique({
        where: { id: parentId },
      })
      .users();
  }

  async getWarehouses(parentId: number): Promise<PrismaWarehouse | null> {
    return this.prisma.branchManager
      .findUnique({
        where: { id: parentId },
      })
      .warehouses();
  }
}