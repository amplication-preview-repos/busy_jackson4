import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ComunApiLogServiceBase } from "./base/comunApiLog.service.base";

@Injectable()
export class ComunApiLogService extends ComunApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
