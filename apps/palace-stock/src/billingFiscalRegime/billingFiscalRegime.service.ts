import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingFiscalRegimeServiceBase } from "./base/billingFiscalRegime.service.base";

@Injectable()
export class BillingFiscalRegimeService extends BillingFiscalRegimeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
