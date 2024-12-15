import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserQualityHistoryServiceBase } from "./base/userQualityHistory.service.base";

@Injectable()
export class UserQualityHistoryService extends UserQualityHistoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
