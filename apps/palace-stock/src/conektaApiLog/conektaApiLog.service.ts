import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConektaApiLogServiceBase } from "./base/conektaApiLog.service.base";

@Injectable()
export class ConektaApiLogService extends ConektaApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
