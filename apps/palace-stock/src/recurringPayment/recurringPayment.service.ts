import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RecurringPaymentServiceBase } from "./base/recurringPayment.service.base";

@Injectable()
export class RecurringPaymentService extends RecurringPaymentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
