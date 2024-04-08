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
  Collaborator as PrismaCollaborator,
  BranchManager as PrismaBranchManager,
  Document as PrismaDocument,
  UserModel as PrismaUserModel,
} from "@prisma/client";

export class CollaboratorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.CollaboratorCountArgs, "select">
  ): Promise<number> {
    return this.prisma.collaborator.count(args);
  }

  async collaborators<T extends Prisma.CollaboratorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CollaboratorFindManyArgs>
  ): Promise<PrismaCollaborator[]> {
    return this.prisma.collaborator.findMany<Prisma.CollaboratorFindManyArgs>(
      args
    );
  }
  async collaborator<T extends Prisma.CollaboratorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CollaboratorFindUniqueArgs>
  ): Promise<PrismaCollaborator | null> {
    return this.prisma.collaborator.findUnique(args);
  }
  async createCollaborator<T extends Prisma.CollaboratorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CollaboratorCreateArgs>
  ): Promise<PrismaCollaborator> {
    return this.prisma.collaborator.create<T>(args);
  }
  async updateCollaborator<T extends Prisma.CollaboratorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CollaboratorUpdateArgs>
  ): Promise<PrismaCollaborator> {
    return this.prisma.collaborator.update<T>(args);
  }
  async deleteCollaborator<T extends Prisma.CollaboratorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CollaboratorDeleteArgs>
  ): Promise<PrismaCollaborator> {
    return this.prisma.collaborator.delete(args);
  }

  async findBranchManagers(
    parentId: number,
    args: Prisma.BranchManagerFindManyArgs
  ): Promise<PrismaBranchManager[]> {
    return this.prisma.collaborator
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .branchManagers(args);
  }

  async findDocuments(
    parentId: number,
    args: Prisma.DocumentFindManyArgs
  ): Promise<PrismaDocument[]> {
    return this.prisma.collaborator
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .documents(args);
  }

  async findUsersUsersCollaboratorIdTocollaborators(
    parentId: number,
    args: Prisma.UserModelFindManyArgs
  ): Promise<PrismaUserModel[]> {
    return this.prisma.collaborator
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .usersUsersCollaboratorIdTocollaborators(args);
  }

  async getUsersCollaboratorsCreatedUserIdTousers(
    parentId: number
  ): Promise<PrismaUserModel | null> {
    return this.prisma.collaborator
      .findUnique({
        where: { id: parentId },
      })
      .usersCollaboratorsCreatedUserIdTousers();
  }
}