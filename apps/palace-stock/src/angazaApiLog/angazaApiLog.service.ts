import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AngazaApiLogServiceBase } from "./base/angazaApiLog.service.base";

@Injectable()
export class AngazaApiLogService extends AngazaApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
