import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingConceptServiceBase } from "./base/billingConcept.service.base";

@Injectable()
export class BillingConceptService extends BillingConceptServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
