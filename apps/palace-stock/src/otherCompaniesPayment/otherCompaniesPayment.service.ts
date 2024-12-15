import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OtherCompaniesPaymentServiceBase } from "./base/otherCompaniesPayment.service.base";

@Injectable()
export class OtherCompaniesPaymentService extends OtherCompaniesPaymentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
