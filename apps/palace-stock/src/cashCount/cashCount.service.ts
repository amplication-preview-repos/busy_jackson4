import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CashCountServiceBase } from "./base/cashCount.service.base";

@Injectable()
export class CashCountService extends CashCountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
