import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProtectionCertActivationServiceBase } from "./base/protectionCertActivation.service.base";

@Injectable()
export class ProtectionCertActivationService extends ProtectionCertActivationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
