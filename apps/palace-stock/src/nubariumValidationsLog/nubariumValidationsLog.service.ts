import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NubariumValidationsLogServiceBase } from "./base/nubariumValidationsLog.service.base";

@Injectable()
export class NubariumValidationsLogService extends NubariumValidationsLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
