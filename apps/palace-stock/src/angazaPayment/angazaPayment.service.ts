import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AngazaPaymentServiceBase } from "./base/angazaPayment.service.base";

@Injectable()
export class AngazaPaymentService extends AngazaPaymentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
