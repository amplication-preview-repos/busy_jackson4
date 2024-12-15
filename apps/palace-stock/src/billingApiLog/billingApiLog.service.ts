import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingApiLogServiceBase } from "./base/billingApiLog.service.base";

@Injectable()
export class BillingApiLogService extends BillingApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
