import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaycodeWebhookLogServiceBase } from "./base/paycodeWebhookLog.service.base";

@Injectable()
export class PaycodeWebhookLogService extends PaycodeWebhookLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
