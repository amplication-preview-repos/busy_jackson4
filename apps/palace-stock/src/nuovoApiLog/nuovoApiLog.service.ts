import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NuovoApiLogServiceBase } from "./base/nuovoApiLog.service.base";

@Injectable()
export class NuovoApiLogService extends NuovoApiLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
