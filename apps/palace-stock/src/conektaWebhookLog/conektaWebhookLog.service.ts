import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConektaWebhookLogServiceBase } from "./base/conektaWebhookLog.service.base";

@Injectable()
export class ConektaWebhookLogService extends ConektaWebhookLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
