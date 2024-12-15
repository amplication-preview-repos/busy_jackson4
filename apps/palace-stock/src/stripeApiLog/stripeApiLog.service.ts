import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StripeApiLogServiceBase } from "./base/stripeApiLog.service.base";

@Injectable()
export class StripeApiLogService extends StripeApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
