import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AccessLevelServiceBase } from "./base/accessLevel.service.base";

@Injectable()
export class AccessLevelService extends AccessLevelServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
