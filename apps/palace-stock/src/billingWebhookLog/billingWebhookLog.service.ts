import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingWebhookLogServiceBase } from "./base/billingWebhookLog.service.base";

@Injectable()
export class BillingWebhookLogService extends BillingWebhookLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
