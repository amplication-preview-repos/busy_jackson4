import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaycodePaymentTransacServiceBase } from "./base/paycodePaymentTransac.service.base";

@Injectable()
export class PaycodePaymentTransacService extends PaycodePaymentTransacServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
