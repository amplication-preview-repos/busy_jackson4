import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WimotelecomApiLogServiceBase } from "./base/wimotelecomApiLog.service.base";

@Injectable()
export class WimotelecomApiLogService extends WimotelecomApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
