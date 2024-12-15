import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StockSeryServiceBase } from "./base/stockSery.service.base";

@Injectable()
export class StockSeryService extends StockSeryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
