import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FinancedSaleServiceBase } from "./base/financedSale.service.base";

@Injectable()
export class FinancedSaleService extends FinancedSaleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
