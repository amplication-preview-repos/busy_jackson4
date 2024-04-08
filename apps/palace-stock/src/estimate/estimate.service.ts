import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EstimateServiceBase } from "./base/estimate.service.base";

@Injectable()
export class EstimateService extends EstimateServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
