import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ModifiedPaymentServiceBase } from "./base/modifiedPayment.service.base";

@Injectable()
export class ModifiedPaymentService extends ModifiedPaymentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
