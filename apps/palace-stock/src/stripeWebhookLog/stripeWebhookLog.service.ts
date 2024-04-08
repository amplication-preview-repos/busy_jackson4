import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StripeWebhookLogServiceBase } from "./base/stripeWebhookLog.service.base";

@Injectable()
export class StripeWebhookLogService extends StripeWebhookLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
