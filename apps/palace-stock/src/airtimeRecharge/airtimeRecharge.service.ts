import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AirtimeRechargeServiceBase } from "./base/airtimeRecharge.service.base";

@Injectable()
export class AirtimeRechargeService extends AirtimeRechargeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
