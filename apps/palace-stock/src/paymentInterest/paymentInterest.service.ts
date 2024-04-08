import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentInterestServiceBase } from "./base/paymentInterest.service.base";

@Injectable()
export class PaymentInterestService extends PaymentInterestServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
