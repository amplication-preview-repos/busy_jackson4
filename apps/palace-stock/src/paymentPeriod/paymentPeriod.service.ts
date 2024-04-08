import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentPeriodServiceBase } from "./base/paymentPeriod.service.base";

@Injectable()
export class PaymentPeriodService extends PaymentPeriodServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
