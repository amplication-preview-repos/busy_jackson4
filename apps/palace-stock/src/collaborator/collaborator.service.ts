import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CollaboratorServiceBase } from "./base/collaborator.service.base";

@Injectable()
export class CollaboratorService extends CollaboratorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
