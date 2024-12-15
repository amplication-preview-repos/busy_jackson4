import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaycodeApiLogServiceBase } from "./base/paycodeApiLog.service.base";

@Injectable()
export class PaycodeApiLogService extends PaycodeApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
