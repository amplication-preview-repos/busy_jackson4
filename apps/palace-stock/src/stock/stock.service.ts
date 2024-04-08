import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StockServiceBase } from "./base/stock.service.base";

@Injectable()
export class StockService extends StockServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
