import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CashSaleDetailServiceBase } from "./base/cashSaleDetail.service.base";

@Injectable()
export class CashSaleDetailService extends CashSaleDetailServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
