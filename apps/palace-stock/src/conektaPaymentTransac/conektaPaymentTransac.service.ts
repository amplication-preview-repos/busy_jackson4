import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConektaPaymentTransacServiceBase } from "./base/conektaPaymentTransac.service.base";

@Injectable()
export class ConektaPaymentTransacService extends ConektaPaymentTransacServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
