import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WarehouseLoanAmountServiceBase } from "./base/warehouseLoanAmount.service.base";

@Injectable()
export class WarehouseLoanAmountService extends WarehouseLoanAmountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
