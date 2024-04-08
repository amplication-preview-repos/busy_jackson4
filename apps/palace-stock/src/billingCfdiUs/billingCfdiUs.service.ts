import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingCfdiUsServiceBase } from "./base/billingCfdiUs.service.base";

@Injectable()
export class BillingCfdiUsService extends BillingCfdiUsServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
