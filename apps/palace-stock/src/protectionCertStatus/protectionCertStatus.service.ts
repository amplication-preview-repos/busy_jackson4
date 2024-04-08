import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProtectionCertStatusServiceBase } from "./base/protectionCertStatus.service.base";

@Injectable()
export class ProtectionCertStatusService extends ProtectionCertStatusServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
