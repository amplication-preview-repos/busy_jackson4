import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DocumentTypeServiceBase } from "./base/documentType.service.base";

@Injectable()
export class DocumentTypeService extends DocumentTypeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
