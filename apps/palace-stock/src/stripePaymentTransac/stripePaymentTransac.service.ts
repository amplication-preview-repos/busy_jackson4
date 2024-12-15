import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StripePaymentTransacServiceBase } from "./base/stripePaymentTransac.service.base";

@Injectable()
export class StripePaymentTransacService extends StripePaymentTransacServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
