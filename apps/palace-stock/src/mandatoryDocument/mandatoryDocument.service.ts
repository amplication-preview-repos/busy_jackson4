import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MandatoryDocumentServiceBase } from "./base/mandatoryDocument.service.base";

@Injectable()
export class MandatoryDocumentService extends MandatoryDocumentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
