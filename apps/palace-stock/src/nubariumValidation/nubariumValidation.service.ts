import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NubariumValidationServiceBase } from "./base/nubariumValidation.service.base";

@Injectable()
export class NubariumValidationService extends NubariumValidationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
