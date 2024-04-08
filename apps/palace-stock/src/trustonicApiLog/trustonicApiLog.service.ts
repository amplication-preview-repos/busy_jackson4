import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TrustonicApiLogServiceBase } from "./base/trustonicApiLog.service.base";

@Injectable()
export class TrustonicApiLogService extends TrustonicApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
