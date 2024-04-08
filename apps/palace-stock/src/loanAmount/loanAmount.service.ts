import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoanAmountServiceBase } from "./base/loanAmount.service.base";

@Injectable()
export class LoanAmountService extends LoanAmountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
