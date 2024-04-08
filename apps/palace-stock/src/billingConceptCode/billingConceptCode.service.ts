import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingConceptCodeServiceBase } from "./base/billingConceptCode.service.base";

@Injectable()
export class BillingConceptCodeService extends BillingConceptCodeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
