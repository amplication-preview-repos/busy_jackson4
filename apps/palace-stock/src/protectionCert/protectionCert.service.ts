import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProtectionCertServiceBase } from "./base/protectionCert.service.base";

@Injectable()
export class ProtectionCertService extends ProtectionCertServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
