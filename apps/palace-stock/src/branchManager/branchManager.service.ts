import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BranchManagerServiceBase } from "./base/branchManager.service.base";

@Injectable()
export class BranchManagerService extends BranchManagerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
