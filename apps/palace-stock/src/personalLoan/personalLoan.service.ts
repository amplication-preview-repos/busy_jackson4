import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PersonalLoanServiceBase } from "./base/personalLoan.service.base";

@Injectable()
export class PersonalLoanService extends PersonalLoanServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
