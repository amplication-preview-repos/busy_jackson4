import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BankReceiptServiceBase } from "./base/bankReceipt.service.base";

@Injectable()
export class BankReceiptService extends BankReceiptServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
