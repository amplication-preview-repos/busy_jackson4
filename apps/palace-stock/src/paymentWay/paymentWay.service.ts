import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentWayServiceBase } from "./base/paymentWay.service.base";

@Injectable()
export class PaymentWayService extends PaymentWayServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
