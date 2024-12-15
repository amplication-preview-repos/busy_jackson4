import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SmsMasivosApiLogServiceBase } from "./base/smsMasivosApiLog.service.base";

@Injectable()
export class SmsMasivosApiLogService extends SmsMasivosApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
