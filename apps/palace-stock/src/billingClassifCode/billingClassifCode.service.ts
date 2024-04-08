import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingClassifCodeServiceBase } from "./base/billingClassifCode.service.base";

@Injectable()
export class BillingClassifCodeService extends BillingClassifCodeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
