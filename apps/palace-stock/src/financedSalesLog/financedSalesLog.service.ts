import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FinancedSalesLogServiceBase } from "./base/financedSalesLog.service.base";

@Injectable()
export class FinancedSalesLogService extends FinancedSalesLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
