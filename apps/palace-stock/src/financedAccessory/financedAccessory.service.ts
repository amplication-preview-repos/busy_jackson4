import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FinancedAccessoryServiceBase } from "./base/financedAccessory.service.base";

@Injectable()
export class FinancedAccessoryService extends FinancedAccessoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
