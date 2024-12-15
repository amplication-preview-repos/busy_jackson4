import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TimelyPayDiscountServiceBase } from "./base/timelyPayDiscount.service.base";

@Injectable()
export class TimelyPayDiscountService extends TimelyPayDiscountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
