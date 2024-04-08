import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CashSaleServiceBase } from "./base/cashSale.service.base";

@Injectable()
export class CashSaleService extends CashSaleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
