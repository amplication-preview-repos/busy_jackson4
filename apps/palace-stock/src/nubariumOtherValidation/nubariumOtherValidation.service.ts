import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NubariumOtherValidationServiceBase } from "./base/nubariumOtherValidation.service.base";

@Injectable()
export class NubariumOtherValidationService extends NubariumOtherValidationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
