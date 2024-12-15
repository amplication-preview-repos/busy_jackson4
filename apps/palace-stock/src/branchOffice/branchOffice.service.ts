import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BranchOfficeServiceBase } from "./base/branchOffice.service.base";

@Injectable()
export class BranchOfficeService extends BranchOfficeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
