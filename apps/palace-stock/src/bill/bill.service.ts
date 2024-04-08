import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillServiceBase } from "./base/bill.service.base";

@Injectable()
export class BillService extends BillServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
