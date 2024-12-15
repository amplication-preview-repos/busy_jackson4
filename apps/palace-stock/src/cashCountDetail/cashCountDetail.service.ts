import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CashCountDetailServiceBase } from "./base/cashCountDetail.service.base";

@Injectable()
export class CashCountDetailService extends CashCountDetailServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
